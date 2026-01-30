// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorIDPage, type CursorIDPageParams, PagePromise } from '../../core/pagination';
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
   *     'tbl_01kfxgjd94fn9stqm45rqr2pnz',
   *     {
   *       structured_sheet_id: 'ss_01kfxgjd94fn9stqm42nejb627',
   *     },
   *   );
   * ```
   */
  retrieve(
    tableID: string,
    params: TableRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<TableResponse> {
    const { structured_sheet_id } = params;
    return this._client.get(path`/v1/structured-sheets/${structured_sheet_id}/tables/${tableID}`, options);
  }

  /**
   * List all tables extracted from the structured sheet. Only available when
   * conversion status is 'completed'.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tableResponse of client.structuredSheets.tables.list(
   *   'ss_01kfxgjd94fn9stqm42nejb627',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    structuredSheetID: string,
    query: TableListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TableResponsesCursorIDPage, TableResponse> {
    return this._client.getAPIList(
      path`/v1/structured-sheets/${structuredSheetID}/tables`,
      CursorIDPage<TableResponse>,
      { query, ...options },
    );
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
   *     'tbl_01kfxgjd94fn9stqm45rqr2pnz',
   *     {
   *       structured_sheet_id: 'ss_01kfxgjd94fn9stqm42nejb627',
   *       format: 'parquet',
   *     },
   *   );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  download(tableID: string, params: TableDownloadParams, options?: RequestOptions): APIPromise<Response> {
    const { structured_sheet_id, ...query } = params;
    return this._client.get(path`/v1/structured-sheets/${structured_sheet_id}/tables/${tableID}/download`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/vnd.apache.parquet' }, options?.headers]),
      __binaryResponse: true,
    });
  }
}

export type TableResponsesCursorIDPage = CursorIDPage<TableResponse>;

/**
 * Response representing a table extracted from a structured sheet.
 *
 * This is returned from GET (retrieve) and list table endpoints. Table names use a
 * composite format: {normalized_sheet_name}\_\_{table_name}.
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
   * Composite table name: {normalized_sheet_name}**{table_name}. Uses lowercase
   * snake_case. Aggregation tables end with '**aggregations'. Two special metadata
   * tables exist per structured sheet: '**deeptable_workbook_metadata' (workbook
   * provenance info) and '**deeptable_table_overview' (summary of all tables).
   * Example: 'staffing**head_count' or 'staffing**head_count\_\_aggregations'.
   */
  name: string;

  /**
   * The object type, which is always 'table'.
   */
  object: 'table';

  /**
   * The original Excel sheet name this table came from.
   */
  sheet_name: string;

  /**
   * The ID of the structured sheet this table belongs to.
   */
  structured_sheet_id: string;

  /**
   * The type of table (relational, aggregation, tableless, or metadata).
   */
  type: 'relational' | 'aggregation' | 'tableless' | 'metadata';
}

export interface TableRetrieveParams {
  /**
   * The unique identifier of the structured sheet conversion.
   */
  structured_sheet_id: string;
}

export interface TableListParams extends CursorIDPageParams {}

export interface TableDownloadParams {
  /**
   * Path param: The unique identifier of the structured sheet conversion.
   */
  structured_sheet_id: string;

  /**
   * Query param: The format to download the table data in.
   */
  format: 'parquet' | 'csv';
}

export declare namespace Tables {
  export {
    type TableResponse as TableResponse,
    type TableResponsesCursorIDPage as TableResponsesCursorIDPage,
    type TableRetrieveParams as TableRetrieveParams,
    type TableListParams as TableListParams,
    type TableDownloadParams as TableDownloadParams,
  };
}
