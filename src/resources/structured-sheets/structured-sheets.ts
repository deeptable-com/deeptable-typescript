// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TablesAPI from './tables';
import {
  TableDownloadParams,
  TableListParams,
  TableResponse,
  TableResponsesCursorIDPage,
  TableRetrieveParams,
  Tables,
} from './tables';
import { APIPromise } from '../../core/api-promise';
import { CursorIDPage, type CursorIDPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class StructuredSheets extends APIResource {
  tables: TablesAPI.Tables = new TablesAPI.Tables(this._client);

  /**
   * Start converting a spreadsheet workbook into structured data. This initiates an
   * asynchronous conversion process. Poll the returned resource using the `id` to
   * check completion status.
   *
   * @example
   * ```ts
   * const structuredSheetResponse =
   *   await client.structuredSheets.create({
   *     file_id: 'file_01h45ytscbebyvny4gc8cr8ma2',
   *   });
   * ```
   */
  create(body: StructuredSheetCreateParams, options?: RequestOptions): APIPromise<StructuredSheetResponse> {
    return this._client.post('/v1/structured-sheets', { body, ...options });
  }

  /**
   * Get the status and details of a structured sheet conversion.
   *
   * @example
   * ```ts
   * const structuredSheetResponse =
   *   await client.structuredSheets.retrieve(
   *     'ss_01kfxgjd94fn9stqm42nejb627',
   *   );
   * ```
   */
  retrieve(structuredSheetID: string, options?: RequestOptions): APIPromise<StructuredSheetResponse> {
    return this._client.get(path`/v1/structured-sheets/${structuredSheetID}`, options);
  }

  /**
   * List all structured sheets conversions for the authenticated user. Results are
   * paginated using cursor-based pagination.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const structuredSheetResponse of client.structuredSheets.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: StructuredSheetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<StructuredSheetResponsesCursorIDPage, StructuredSheetResponse> {
    return this._client.getAPIList('/v1/structured-sheets', CursorIDPage<StructuredSheetResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Delete a structured sheet conversion and its associated exports. This action
   * cannot be undone.
   *
   * @example
   * ```ts
   * const structuredSheet =
   *   await client.structuredSheets.delete(
   *     'ss_01kfxgjd94fn9stqm42nejb627',
   *   );
   * ```
   */
  delete(structuredSheetID: string, options?: RequestOptions): APIPromise<StructuredSheetDeleteResponse> {
    return this._client.delete(path`/v1/structured-sheets/${structuredSheetID}`, options);
  }

  /**
   * Cancel a structured sheet conversion that is in progress. Only jobs with status
   * 'queued' or 'in_progress' can be cancelled.
   *
   * @example
   * ```ts
   * const structuredSheetResponse =
   *   await client.structuredSheets.cancel(
   *     'ss_01kfxgjd94fn9stqm42nejb627',
   *   );
   * ```
   */
  cancel(structuredSheetID: string, options?: RequestOptions): APIPromise<StructuredSheetResponse> {
    return this._client.post(path`/v1/structured-sheets/${structuredSheetID}/cancel`, options);
  }

  /**
   * Download the structured data in the specified format. Only available when
   * conversion status is 'completed'.
   *
   * Available formats:
   *
   * - `sqlite`: SQLite database containing all extracted tables
   * - `cell_labels`: CSV file with cell-level semantic labels
   *
   * @example
   * ```ts
   * const response = await client.structuredSheets.download(
   *   'ss_01kfxgjd94fn9stqm42nejb627',
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  download(
    structuredSheetID: string,
    query: StructuredSheetDownloadParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Response> {
    return this._client.get(path`/v1/structured-sheets/${structuredSheetID}/download`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/x-sqlite3' }, options?.headers]),
      __binaryResponse: true,
    });
  }
}

export type StructuredSheetResponsesCursorIDPage = CursorIDPage<StructuredSheetResponse>;

/**
 * Response representing a structured sheet conversion job.
 *
 * This is returned from POST (create), GET (retrieve), and list endpoints.
 */
export interface StructuredSheetResponse {
  /**
   * The unique identifier for this structured sheet conversion.
   */
  id: string;

  /**
   * The timestamp when the conversion was started.
   */
  created_at: string;

  /**
   * The unique identifier for the source file.
   */
  file_id: string;

  /**
   * The object type, which is always 'structured_sheet'.
   */
  object: 'structured_sheet';

  /**
   * The current processing status.
   */
  status: 'queued' | 'in_progress' | 'completed' | 'failed' | 'cancelled';

  /**
   * The timestamp when the conversion was last updated.
   */
  updated_at: string;

  /**
   * Error information when processing fails.
   */
  last_error?: StructuredSheetResponse.LastError | null;

  /**
   * List of sheet names included in this conversion.
   */
  sheet_names?: Array<string>;

  /**
   * Number of tables extracted from the workbook. Only present when status is
   * 'completed'.
   */
  table_count?: number | null;
}

export namespace StructuredSheetResponse {
  /**
   * Error information when processing fails.
   */
  export interface LastError {
    /**
     * A machine-readable error code.
     */
    code: string;

    /**
     * A human-readable description of the error.
     */
    message: string;
  }
}

/**
 * Response from deleting a structured sheet.
 *
 * Following the OpenAI API convention for delete responses.
 */
export interface StructuredSheetDeleteResponse {
  /**
   * The unique identifier of the deleted structured sheet.
   */
  id: string;

  /**
   * Whether the structured sheet was successfully deleted.
   */
  deleted: true;

  /**
   * The object type, which is always 'structured_sheet'.
   */
  object: 'structured_sheet';
}

export interface StructuredSheetCreateParams {
  /**
   * The unique identifier of the file to convert.
   */
  file_id: string;

  /**
   * List of sheet names to convert. If None, all sheets will be converted.
   */
  sheet_names?: Array<string> | null;
}

export interface StructuredSheetListParams extends CursorIDPageParams {}

export interface StructuredSheetDownloadParams {
  /**
   * The export format to download.
   */
  format?: 'sqlite' | 'cell_labels';
}

StructuredSheets.Tables = Tables;

export declare namespace StructuredSheets {
  export {
    type StructuredSheetResponse as StructuredSheetResponse,
    type StructuredSheetDeleteResponse as StructuredSheetDeleteResponse,
    type StructuredSheetResponsesCursorIDPage as StructuredSheetResponsesCursorIDPage,
    type StructuredSheetCreateParams as StructuredSheetCreateParams,
    type StructuredSheetListParams as StructuredSheetListParams,
    type StructuredSheetDownloadParams as StructuredSheetDownloadParams,
  };

  export {
    Tables as Tables,
    type TableResponse as TableResponse,
    type TableResponsesCursorIDPage as TableResponsesCursorIDPage,
    type TableRetrieveParams as TableRetrieveParams,
    type TableListParams as TableListParams,
    type TableDownloadParams as TableDownloadParams,
  };
}
