import fs from 'node:fs';
import path from 'node:path';

import { Database, default as initSqlJs } from 'sql.js';

import DeepTable from '@deeptable/deeptable';

type Args = {
  workbookPath: string;
  outputDir: string;
  formats: Array<'sqlite' | 'csv'>;
  pollIntervalSeconds: number;
};

function parseArgs(): Args {
  const args = process.argv.slice(2);
  let workbookPath = '';
  let outputDir = '';
  let pollIntervalSeconds = 10;
  const formats: Array<'sqlite' | 'csv'> = ['sqlite'];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--workbook-path') workbookPath = args[index + 1] ?? '';
    if (arg === '--output-dir') outputDir = args[index + 1] ?? '';
    if (arg === '--poll-interval-seconds') pollIntervalSeconds = Number(args[index + 1] ?? '10');
    if (arg === '--formats') {
      formats.length = 0;
      while (args[index + 1] && !args[index + 1]!.startsWith('--')) {
        formats.push(args[index + 1] as 'sqlite' | 'csv');
        index += 1;
      }
    }
  }

  if (!workbookPath || !outputDir) {
    throw new Error('Expected --workbook-path and --output-dir.');
  }

  return { workbookPath, outputDir, formats, pollIntervalSeconds };
}

function escapeCsv(value: unknown): string {
  const text = value == null ? '' : String(value);
  if (!text.includes(',') && !text.includes('"') && !text.includes('\n')) {
    return text;
  }
  return `"${text.replaceAll('"', '""')}"`;
}

async function waitForStructuredSheet(client: DeepTable, structuredSheetId: string, pollIntervalSeconds: number) {
  while (true) {
    const structuredSheet = await client.structuredSheets.retrieve(structuredSheetId);
    if (structuredSheet.status !== 'queued' && structuredSheet.status !== 'in_progress') {
      return structuredSheet;
    }
    await new Promise((resolve) => setTimeout(resolve, pollIntervalSeconds * 1000));
  }
}

async function exportSqliteTablesToCsv(sqlitePath: string, csvDir: string): Promise<void> {
  fs.mkdirSync(csvDir, { recursive: true });
  const SQL = await initSqlJs();
  const db = new SQL.Database(fs.readFileSync(sqlitePath));

  const tableNamesResult = db.exec(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
  );
  const tableNames = (tableNamesResult[0]?.values ?? []).map((row) => String(row[0]));

  for (const tableName of tableNames) {
    const queryResult = db.exec(`SELECT * FROM "${tableName.replaceAll('"', '""')}"`)[0];
    const columns = queryResult?.columns ?? [];
    const rows = queryResult?.values ?? [];
    const lines = [columns.map(escapeCsv).join(',')];
    for (const row of rows) {
      lines.push(row.map(escapeCsv).join(','));
    }
    fs.writeFileSync(path.join(csvDir, `${tableName}.csv`), `${lines.join('\n')}\n`, 'utf8');
  }

  db.close();
}

async function main(): Promise<void> {
  const args = parseArgs();
  const workbookPath = path.resolve(args.workbookPath);
  const outputDir = path.resolve(args.outputDir);
  fs.mkdirSync(outputDir, { recursive: true });

  const client = new DeepTable({
    apiKey: process.env.DEEPTABLE_API_KEY,
    baseURL: process.env.DEEPTABLE_BASE_URL,
  });

  const uploadedFile = await client.files.upload({ file: fs.createReadStream(workbookPath) });
  let structuredSheet = await client.structuredSheets.create({ file_id: uploadedFile.id });
  structuredSheet = await waitForStructuredSheet(client, structuredSheet.id, args.pollIntervalSeconds);

  if (structuredSheet.status === 'failed') {
    throw new Error('DeepTable failed to create the structured sheet.');
  }

  const sqlitePath = path.join(outputDir, `${path.parse(workbookPath).name}.sqlite`);
  const sqliteResponse = await client.structuredSheets.download(structuredSheet.id, { format: 'sqlite' });
  fs.writeFileSync(sqlitePath, Buffer.from(await sqliteResponse.arrayBuffer()));
  console.log(`Downloaded ${sqlitePath}`);

  if (args.formats.includes('csv')) {
    const csvDir = path.join(outputDir, 'csv');
    await exportSqliteTablesToCsv(sqlitePath, csvDir);
    console.log(`Exported CSV tables to ${csvDir}`);
  }
}

void main();