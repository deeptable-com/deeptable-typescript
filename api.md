# Files

Types:

- <code><a href="./src/resources/files.ts">File</a></code>
- <code><a href="./src/resources/files.ts">FileDeleteResponse</a></code>

Methods:

- <code title="get /v1/files/{file_id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileID) -> File</code>
- <code title="get /v1/files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FilesCursorIDPage</code>
- <code title="delete /v1/files/{file_id}">client.files.<a href="./src/resources/files.ts">delete</a>(fileID) -> FileDeleteResponse</code>
- <code title="get /v1/files/{file_id}/content">client.files.<a href="./src/resources/files.ts">download</a>(fileID) -> Response</code>
- <code title="post /v1/files">client.files.<a href="./src/resources/files.ts">upload</a>({ ...params }) -> File</code>

# StructuredSheets

Types:

- <code><a href="./src/resources/structured-sheets/structured-sheets.ts">StructuredSheetResponse</a></code>
- <code><a href="./src/resources/structured-sheets/structured-sheets.ts">StructuredSheetDeleteResponse</a></code>

Methods:

- <code title="post /v1/structured-sheets">client.structuredSheets.<a href="./src/resources/structured-sheets/structured-sheets.ts">create</a>({ ...params }) -> StructuredSheetResponse</code>
- <code title="get /v1/structured-sheets/{structured_sheet_id}">client.structuredSheets.<a href="./src/resources/structured-sheets/structured-sheets.ts">retrieve</a>(structuredSheetID) -> StructuredSheetResponse</code>
- <code title="get /v1/structured-sheets">client.structuredSheets.<a href="./src/resources/structured-sheets/structured-sheets.ts">list</a>({ ...params }) -> StructuredSheetResponsesCursorIDPage</code>
- <code title="delete /v1/structured-sheets/{structured_sheet_id}">client.structuredSheets.<a href="./src/resources/structured-sheets/structured-sheets.ts">delete</a>(structuredSheetID) -> StructuredSheetDeleteResponse</code>
- <code title="post /v1/structured-sheets/{structured_sheet_id}/cancel">client.structuredSheets.<a href="./src/resources/structured-sheets/structured-sheets.ts">cancel</a>(structuredSheetID) -> StructuredSheetResponse</code>
- <code title="get /v1/structured-sheets/{structured_sheet_id}/download">client.structuredSheets.<a href="./src/resources/structured-sheets/structured-sheets.ts">download</a>(structuredSheetID, { ...params }) -> Response</code>

## Tables

Types:

- <code><a href="./src/resources/structured-sheets/tables.ts">TableResponse</a></code>

Methods:

- <code title="get /v1/structured-sheets/{structured_sheet_id}/tables/{table_id}">client.structuredSheets.tables.<a href="./src/resources/structured-sheets/tables.ts">retrieve</a>(tableID, { ...params }) -> TableResponse</code>
- <code title="get /v1/structured-sheets/{structured_sheet_id}/tables">client.structuredSheets.tables.<a href="./src/resources/structured-sheets/tables.ts">list</a>(structuredSheetID, { ...params }) -> TableResponsesCursorIDPage</code>
- <code title="get /v1/structured-sheets/{structured_sheet_id}/tables/{table_id}/download">client.structuredSheets.tables.<a href="./src/resources/structured-sheets/tables.ts">download</a>(tableID, { ...params }) -> Response</code>
