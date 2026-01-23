# Files

Types:

- <code><a href="./src/resources/files.ts">File</a></code>

Methods:

- <code title="get /v1/files/{file_id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileID) -> File</code>
- <code title="get /v1/files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FilesCursorIDPage</code>
- <code title="delete /v1/files/{file_id}">client.files.<a href="./src/resources/files.ts">delete</a>(fileID) -> void</code>
- <code title="post /v1/files">client.files.<a href="./src/resources/files.ts">upload</a>({ ...params }) -> File</code>

# StructuredSheets

Types:

- <code><a href="./src/resources/structured-sheets/structured-sheets.ts">StructuredSheetResponse</a></code>

Methods:

- <code title="post /v1/structured-sheets">client.structuredSheets.<a href="./src/resources/structured-sheets/structured-sheets.ts">create</a>({ ...params }) -> StructuredSheetResponse</code>
- <code title="get /v1/structured-sheets/{structured_sheets_id}">client.structuredSheets.<a href="./src/resources/structured-sheets/structured-sheets.ts">retrieve</a>(structuredSheetsID) -> StructuredSheetResponse</code>
- <code title="get /v1/structured-sheets">client.structuredSheets.<a href="./src/resources/structured-sheets/structured-sheets.ts">list</a>({ ...params }) -> StructuredSheetResponsesCursorIDPage</code>
- <code title="delete /v1/structured-sheets/{structured_sheets_id}">client.structuredSheets.<a href="./src/resources/structured-sheets/structured-sheets.ts">delete</a>(structuredSheetsID) -> void</code>

## Exports

Methods:

- <code title="get /v1/structured-sheets/{structured_sheets_id}/exports/sqlite">client.structuredSheets.exports.<a href="./src/resources/structured-sheets/exports.ts">downloadSqlite</a>(structuredSheetsID) -> Response</code>
