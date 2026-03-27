# Agentic Question Answering

This example compares three ways to answer the same spreadsheet question:

1. Directly from the original Excel workbook
2. From a DeepTable SQLite export
3. From a DeepTable CSV export folder

The same agent loop is used in each case. What changes is the tool surface:

- `excel` mode gives the model sheet-level search and range-reading tools
- `sqlite` mode gives the model a table overview plus SQL access
- `csv` mode loads the CSV folder into an in-memory SQLite database and exposes the same SQL tools

## Requirements

- `OPENAI_API_KEY`
- `DEEPTABLE_API_KEY` if you want to generate a fresh DeepTable structured sheet from a workbook with `convert-workbook-to-structured-sheet.ts`

Install dependencies with `npm`:

```bash
npm install
```

## Ask a question from a raw Excel workbook

```bash
npx tsx ask-question.ts \
  --source excel \
  --excel-path /path/to/example.xlsx \
  --question "Which subscription-country pair has the highest revenue in 2025, and what cell contains that value?"
```

## Ask the same question from a DeepTable SQLite export

```bash
npx tsx ask-question.ts \
  --source sqlite \
  --sqlite-path /path/to/example.sqlite \
  --question "Which subscription-country pair has the highest revenue in 2025, and what cell contains that value?"
```

## Ask the same question from a DeepTable CSV export

```bash
npx tsx ask-question.ts \
  --source csv \
  --csv-dir /path/to/csv \
  --question "Which subscription-country pair has the highest revenue in 2025, and what cell contains that value?"
```

## Create a fresh DeepTable structured sheet with the DeepTable SDK

```bash
npx tsx convert-workbook-to-structured-sheet.ts \
  --workbook-path /path/to/example.xlsx \
  --output-dir ./outputs \
  --formats sqlite csv
```

## Monorepo validation example

```bash
npx tsx ask-question.ts \
  --source sqlite \
  --sqlite-path /workspaces/deeptable/examples/acme_subscriptions/structured_sheets_outputs/acme_subscriptions.sqlite \
  --question "Which subscription-country pair has the highest revenue in 2025, and what cell contains that value?"
```

```bash
npx tsx ask-question.ts \
  --source csv \
  --csv-dir /workspaces/deeptable/examples/acme_subscriptions/structured_sheets_outputs/csv \
  --question "Which subscription-country pair has the highest revenue in 2025, and what cell contains that value?"
```

## Coding-agent prompt templates

If you want to compare this scripted example with a coding agent such as GitHub Copilot, Claude Code, or Codex, use the prompt templates in [AGENTS.md](./AGENTS.md).
