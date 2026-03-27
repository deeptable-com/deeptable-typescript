import fs from 'node:fs';
import path from 'node:path';

import { parse } from 'csv-parse/sync';
import OpenAI from 'openai';
import { Database, default as initSqlJs } from 'sql.js';
import XLSX from 'xlsx';

type SourceType = 'excel' | 'sqlite' | 'csv';

type Args = {
  source: SourceType;
  question: string;
  model: string;
  excelPath?: string;
  sqlitePath?: string;
  csvDir?: string;
};

const structuredSystemPrompt = [
  'You answer questions about a spreadsheet that has already been transformed into structured tables.',
  '',
  'Always follow this workflow:',
  '1. Call get_table_overview first.',
  '2. Use run_sql_query to inspect the relevant tables.',
  '3. Give a concise answer.',
  '4. Always cite cell references from columns prefixed with __ref or __refs whenever they are available.',
  '',
  'Never guess. If the data is insufficient, say so.',
].join('\n');

const excelSystemPrompt = [
  'You answer questions directly from a raw Excel workbook.',
  '',
  'Always follow this workflow:',
  '1. Call list_excel_sheets or search_excel_values first.',
  '2. Read only the ranges you need with read_excel_range.',
  '3. Give a concise answer.',
  '4. Always cite cell references.',
  '',
  'Never guess. If the data is insufficient, say so.',
].join('\n');

function parseArgs(): Args {
  const rawArgs = process.argv.slice(2);
  const args: Partial<Args> = {
    model: process.env.OPENAI_MODEL ?? 'gpt-4.1',
  };

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    const value = rawArgs[index + 1];
    if (arg === '--source' && value) args.source = value as SourceType;
    if (arg === '--question' && value) args.question = value;
    if (arg === '--model' && value) args.model = value;
    if (arg === '--excel-path' && value) args.excelPath = value;
    if (arg === '--sqlite-path' && value) args.sqlitePath = value;
    if (arg === '--csv-dir' && value) args.csvDir = value;
  }

  if (!args.source || !args.question || !args.model) {
    throw new Error('Expected --source and --question.');
  }

  return args as Args;
}

function normalizeSqliteType(typeName?: string): 'INTEGER' | 'REAL' | 'TEXT' {
  const upperType = (typeName ?? 'TEXT').toUpperCase();
  if (upperType.includes('INT')) return 'INTEGER';
  if (['REAL', 'FLOAT', 'DOUBLE', 'NUMERIC', 'DECIMAL'].some((token) => upperType.includes(token))) {
    return 'REAL';
  }
  return 'TEXT';
}

function quoteIdentifier(identifier: string): string {
  return `"${identifier.replaceAll('"', '""')}"`;
}

function maybeParseNumeric(value: string, typeName?: string): number | string | null {
  if (value === '') return null;
  const normalized = normalizeSqliteType(typeName);
  if (normalized === 'INTEGER') return Number.parseInt(value, 10);
  if (normalized === 'REAL') return Number.parseFloat(value);
  return value;
}

class StructuredSource {
  private constructor(private readonly db: Database) {}

  static async fromSqlite(sqlitePath: string): Promise<StructuredSource> {
    const SQL = await initSqlJs();
    const db = new SQL.Database(fs.readFileSync(sqlitePath));
    return new StructuredSource(db);
  }

  static async fromCsv(csvDir: string): Promise<StructuredSource> {
    const SQL = await initSqlJs();
    const db = new SQL.Database();
    const source = new StructuredSource(db);
    source.loadCsvDir(csvDir);
    return source;
  }

  close(): void {
    this.db.close();
  }

  getTableOverview(): Record<string, unknown> {
    const result = this.runSqlQuery(
      'SELECT table_name, table_type, column_name, column_sqlite_type, column_name_refs FROM __deeptable_table_overview ORDER BY table_name, rowid',
    );
    if ('error' in result) return result;

    const tables = new Map<string, { table_name: string; table_type: string; columns: Array<Record<string, unknown>> }>();
    for (const row of result.rows) {
      const tableName = String(row.table_name);
      if (!tables.has(tableName)) {
        tables.set(tableName, {
          table_name: tableName,
          table_type: String(row.table_type),
          columns: [],
        });
      }
      tables.get(tableName)!.columns.push({
        name: row.column_name,
        sqlite_type: row.column_sqlite_type,
        refs: row.column_name_refs,
      });
    }

    return { tables: Array.from(tables.values()) };
  }

  runSqlQuery(query: string): Record<string, unknown> {
    const normalizedQuery = query.trimStart().toUpperCase();
    if (!normalizedQuery.startsWith('SELECT') && !normalizedQuery.startsWith('WITH')) {
      return { error: 'Only SELECT and WITH queries are allowed.' };
    }

    const execResult = this.db.exec(query)[0];
    const columns = execResult?.columns ?? [];
    const rows = (execResult?.values ?? []).map((row) => Object.fromEntries(columns.map((column, index) => [column, row[index]])));
    return {
      columns,
      row_count: rows.length,
      rows: rows.slice(0, 200),
      truncated: rows.length > 200,
    };
  }

  private loadCsvDir(csvDir: string): void {
    const overviewPath = path.join(csvDir, '__deeptable_table_overview.csv');
    const schemaByTable = new Map<string, Map<string, string>>();

    if (fs.existsSync(overviewPath)) {
      const overviewRows = parse(fs.readFileSync(overviewPath, 'utf8'), { columns: true, skip_empty_lines: true }) as Array<Record<string, string>>;
      for (const row of overviewRows) {
        if (!schemaByTable.has(row.table_name)) schemaByTable.set(row.table_name, new Map());
        schemaByTable.get(row.table_name)!.set(row.column_name, row.column_sqlite_type);
      }
    }

    for (const entry of fs.readdirSync(csvDir).filter((fileName) => fileName.endsWith('.csv')).sort()) {
      const tableName = path.parse(entry).name;
      const rows = parse(fs.readFileSync(path.join(csvDir, entry), 'utf8'), { columns: true, skip_empty_lines: true }) as Array<Record<string, string>>;
      const fieldNames = Object.keys(rows[0] ?? {});
      const declaredTypes = schemaByTable.get(tableName) ?? new Map<string, string>();
      const createSql = `CREATE TABLE ${quoteIdentifier(tableName)} (${fieldNames
        .map((field) => `${quoteIdentifier(field)} ${normalizeSqliteType(declaredTypes.get(field))}`)
        .join(', ')})`;
      this.db.run(createSql);

      const placeholders = fieldNames.map(() => '?').join(', ');
      const statement = this.db.prepare(`INSERT INTO ${quoteIdentifier(tableName)} VALUES (${placeholders})`);
      for (const row of rows) {
        statement.run(fieldNames.map((field) => maybeParseNumeric(row[field] ?? '', declaredTypes.get(field))));
      }
      statement.free();
    }
  }
}

class ExcelSource {
  constructor(private readonly workbook: XLSX.WorkBook) {}

  static fromFile(excelPath: string): ExcelSource {
    return new ExcelSource(XLSX.readFile(excelPath, { cellFormula: false, cellNF: false, cellStyles: false }));
  }

  close(): void {}

  listSheets(): Record<string, unknown> {
    return {
      sheets: this.workbook.SheetNames.map((sheetName) => {
        const worksheet = this.workbook.Sheets[sheetName]!;
        const range = XLSX.utils.decode_range(worksheet['!ref'] ?? 'A1:A1');
        return {
          sheet_name: sheetName,
          max_row: range.e.r + 1,
          max_column: range.e.c + 1,
        };
      }),
    };
  }

  searchValues(searchText: string, maxResults = 25): Record<string, unknown> {
    const lowered = searchText.toLowerCase();
    const matches: Array<Record<string, unknown>> = [];

    for (const sheetName of this.workbook.SheetNames) {
      const worksheet = this.workbook.Sheets[sheetName]!;
      for (const cellAddress of Object.keys(worksheet)) {
        if (cellAddress.startsWith('!')) continue;
        const value = worksheet[cellAddress]?.v;
        if (value == null) continue;
        const text = String(value);
        if (text.toLowerCase().includes(lowered)) {
          matches.push({ sheet_name: sheetName, cell: cellAddress, value: text });
          if (matches.length >= maxResults) {
            return { matches, truncated: true };
          }
        }
      }
    }

    return { matches, truncated: false };
  }

  readRange(sheetName: string, startCell: string, endCell: string): Record<string, unknown> {
    const worksheet = this.workbook.Sheets[sheetName]!;
    const start = XLSX.utils.decode_cell(startCell);
    const end = XLSX.utils.decode_cell(endCell);
    const rows: Array<Array<Record<string, unknown>>> = [];

    for (let row = start.r; row <= end.r; row += 1) {
      const cells: Array<Record<string, unknown>> = [];
      for (let column = start.c; column <= end.c; column += 1) {
        const address = XLSX.utils.encode_cell({ c: column, r: row });
        cells.push({ cell: address, value: worksheet[address]?.v == null ? null : String(worksheet[address]!.v) });
      }
      rows.push(cells);
    }

    return { sheet_name: sheetName, range: `${startCell}:${endCell}`, rows };
  }
}

function buildTools(source: SourceType): Array<Record<string, unknown>> {
  if (source === 'sqlite' || source === 'csv') {
    return [
      {
        type: 'function',
        function: {
          name: 'get_table_overview',
          description: 'Return the DeepTable table overview with table names, column names, and column types.',
          parameters: { type: 'object', properties: {}, required: [] },
        },
      },
      {
        type: 'function',
        function: {
          name: 'run_sql_query',
          description: 'Run a read-only SQL query against the structured tables.',
          parameters: {
            type: 'object',
            properties: {
              query: { type: 'string' },
            },
            required: ['query'],
          },
        },
      },
    ];
  }

  return [
    {
      type: 'function',
      function: {
        name: 'list_excel_sheets',
        description: 'List the workbook sheets and their approximate size.',
        parameters: { type: 'object', properties: {}, required: [] },
      },
    },
    {
      type: 'function',
      function: {
        name: 'search_excel_values',
        description: 'Search the workbook for cell values containing a given text fragment.',
        parameters: {
          type: 'object',
          properties: {
            search_text: { type: 'string' },
            max_results: { type: 'integer', default: 25 },
          },
          required: ['search_text'],
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'read_excel_range',
        description: 'Read a rectangular cell range from a workbook sheet.',
        parameters: {
          type: 'object',
          properties: {
            sheet_name: { type: 'string' },
            start_cell: { type: 'string' },
            end_cell: { type: 'string' },
          },
          required: ['sheet_name', 'start_cell', 'end_cell'],
        },
      },
    },
  ];
}

function handleToolCall(
  source: StructuredSource | ExcelSource,
  toolName: string,
  argumentsJson: string,
): Record<string, unknown> {
  const args = JSON.parse(argumentsJson || '{}') as Record<string, unknown>;
  if (toolName === 'get_table_overview' && source instanceof StructuredSource) {
    return source.getTableOverview();
  }
  if (toolName === 'run_sql_query' && source instanceof StructuredSource) {
    return source.runSqlQuery(String(args.query));
  }
  if (toolName === 'list_excel_sheets' && source instanceof ExcelSource) {
    return source.listSheets();
  }
  if (toolName === 'search_excel_values' && source instanceof ExcelSource) {
    return source.searchValues(String(args.search_text), Number(args.max_results ?? 25));
  }
  if (toolName === 'read_excel_range' && source instanceof ExcelSource) {
    return source.readRange(String(args.sheet_name), String(args.start_cell), String(args.end_cell));
  }
  return { error: `Unsupported tool call: ${toolName}` };
}

async function buildSource(args: Args): Promise<StructuredSource | ExcelSource> {
  if (args.source === 'excel') {
    if (!args.excelPath) throw new Error('Expected --excel-path when --source excel is used.');
    return ExcelSource.fromFile(path.resolve(args.excelPath));
  }
  if (args.source === 'sqlite') {
    if (!args.sqlitePath) throw new Error('Expected --sqlite-path when --source sqlite is used.');
    return StructuredSource.fromSqlite(path.resolve(args.sqlitePath));
  }
  if (!args.csvDir) throw new Error('Expected --csv-dir when --source csv is used.');
  return StructuredSource.fromCsv(path.resolve(args.csvDir));
}

async function runAgent(sourceType: SourceType, source: StructuredSource | ExcelSource, question: string, model: string) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const messages: Array<Record<string, unknown>> = [
    { role: 'system', content: sourceType === 'excel' ? excelSystemPrompt : structuredSystemPrompt },
    { role: 'user', content: question },
  ];

  for (let iteration = 0; iteration < 12; iteration += 1) {
    const completion = await client.chat.completions.create({
      model,
      messages: messages as never,
      tools: buildTools(sourceType) as never,
    });
    const message = completion.choices[0]?.message;
    const toolCalls = message?.tool_calls ?? [];

    if (toolCalls.length === 0) {
      return message?.content ?? '';
    }

    messages.push({
      role: 'assistant',
      content: message?.content ?? '',
      tool_calls: toolCalls,
    });

    for (const toolCall of toolCalls) {
      const result = handleToolCall(source, toolCall.function.name, toolCall.function.arguments);
      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }
  }

  throw new Error('The model did not finish within 12 tool iterations.');
}

async function main(): Promise<void> {
  const args = parseArgs();
  const source = await buildSource(args);
  try {
    const answer = await runAgent(args.source, source, args.question, args.model);
    console.log(answer);
  } finally {
    source.close();
  }
}

void main();