# Prompt Templates

Use these prompts when you want to compare a coding agent working directly from a workbook with the same agent working from DeepTable outputs.

## Raw Excel Case

`example.xlsx` is the original spreadsheet. Please answer the following question by:

1. Listing the workbook's sheets
2. Searching for the relevant labels and totals
3. Reading only the ranges you need to answer confidently

Always provide cell references in your answer.

Here is the question:

`{Question}`

## SQLite Case

`example.sqlite` is a structured representation of `example.xlsx`. Please answer the following question by:

1. Getting an overview of the extracted tables and their columns by reading `__deeptable_table_overview`
2. Querying the relevant tables with `sqlite3`
3. Looking up values directly or computing them from the tables

Always provide cell references in your answer. Use columns prefixed with `__ref` or `__refs` whenever they are available.

Here is the question:

`{Question}`

## CSV Case

The CSV files in `./example` are a structured representation of `example.xlsx`. Please answer the following question by:

1. Getting an overview of the extracted tables and their columns by reading `__deeptable_table_overview.csv`
2. Searching the relevant tables
3. Looking up values directly or computing them from the tables

Always provide cell references in your answer. Use columns prefixed with `__ref` or `__refs` whenever they are available.

Here is the question:

`{Question}`
