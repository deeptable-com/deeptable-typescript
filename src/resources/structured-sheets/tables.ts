// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Tables extends APIResource {
  /**
   * Get details of a specific table extracted from the structured sheet. Only
   * available when conversion status is 'completed'.
   *
   * @example
   * ```ts
   * const tableResponse =
   *   await client.structuredSheets.tables.retrieve(
   *     'tbl_01abc2def3ghjkmnpqrs4uvwxy',
   *     {
   *       structured_sheets_id: 'ss_01abc2def3ghjkmnpqrs4uvwxy',
   *     },
   *   );
   * ```
   */
  retrieve(
    tableID: string,
    params: TableRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<TableResponse> {
    const { structured_sheets_id } = params;
    return this._client.get(path`/v1/structured-sheets/${structured_sheets_id}/tables/${tableID}`, options);
  }

  /**
   * List all tables extracted from the structured sheet. Only available when
   * conversion status is 'completed'.
   *
   * @example
   * ```ts
   * const tables = await client.structuredSheets.tables.list(
   *   'ss_01abc2def3ghjkmnpqrs4uvwxy',
   * );
   * ```
   */
  list(structuredSheetsID: string, options?: RequestOptions): APIPromise<TableListResponse> {
    return this._client.get(path`/v1/structured-sheets/${structuredSheetsID}/tables`, options);
  }

  /**
   * Download the table data in the specified format.
   *
   * Available formats:
   *
   * - `parquet`: Apache Parquet columnar format (recommended for data analysis)
   * - `csv`: Comma-separated values (compatible with any spreadsheet application)
   *
   * @example
   * ```ts
   * const response =
   *   await client.structuredSheets.tables.download(
   *     'tbl_01abc2def3ghjkmnpqrs4uvwxy',
   *     {
   *       structured_sheets_id: 'ss_01abc2def3ghjkmnpqrs4uvwxy',
   *     },
   *   );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  download(tableID: string, params: TableDownloadParams, options?: RequestOptions): APIPromise<Response> {
    const { structured_sheets_id, ...query } = params;
    return this._client.get(path`/v1/structured-sheets/${structured_sheets_id}/tables/${tableID}/download`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/vnd.apache.parquet' }, options?.headers]),
      __binaryResponse: true,
    });
  }
}

/**
 * Response representing a table extracted from a structured sheet.
 *
 * This is returned from GET (retrieve) and list table endpoints. Table names use
 * SQL naming conventions (e.g., monthly_head_count).
 */
export interface TableResponse {
  /**
   * The unique identifier for this table.
   */
  id: string;

  /**
   * The timestamp when this table was created.
   */
  created_at: string;

  /**
   * The name of the table using SQL naming conventions.
   */
  name: string;

  /**
   * The original Excel sheet name this table came from.
   */
  sheet_name: string;

  /**
   * Normalized sheet name for use in SQLite table names and export filenames
   * (lowercase, snake_case).
   */
  sheet_name_normalized: string;

  /**
   * The ID of the structured sheet this table belongs to.
   */
  structured_sheet_id: string;

  /**
   * The type of table (relational, aggregation, or tableless).
   */
  type: 'relational' | 'aggregation' | 'tableless';

  /**
   * The object type, which is always 'table'.
   */
  object?: 'table';
}

/**
 * Paginated response for listing tables from a structured sheet.
 *
 * Uses cursor-based pagination for efficient iteration through results.
 */
export interface TableListResponse {
  /**
   * List of tables.
   */
  data: Array<TableResponse>;

  /**
   * Whether there are more results available after this page.
   */
  has_more: boolean;

  /**
   * Unique identifier for a table.
   */
  first_id?: string | null;

  /**
   * Unique identifier for a table.
   */
  last_id?: string | null;

  /**
   * The object type, which is always 'list'.
   */
  object?: 'list';
}

export interface TableRetrieveParams {
  /**
   * The unique identifier of the structured sheets conversion.
   */
  structured_sheets_id: string;
}

export interface TableDownloadParams {
  /**
   * Path param: The unique identifier of the structured sheets conversion.
   */
  structured_sheets_id: string;

  /**
   * Query param: The format to download the table data in.
   */
  format?: 'parquet' | 'csv';
}

export declare namespace Tables {
  export {
    type TableResponse as TableResponse,
    type TableListResponse as TableListResponse,
    type TableRetrieveParams as TableRetrieveParams,
    type TableDownloadParams as TableDownloadParams,
  };
}
