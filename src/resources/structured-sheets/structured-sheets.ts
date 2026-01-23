// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ExportsAPI from './exports';
import { Exports } from './exports';
import { APIPromise } from '../../core/api-promise';
import { CursorIDPage, type CursorIDPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class StructuredSheets extends APIResource {
  exports: ExportsAPI.Exports = new ExportsAPI.Exports(this._client);

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
   * Get the status and details of a structured sheets conversion.
   *
   * @example
   * ```ts
   * const structuredSheetResponse =
   *   await client.structuredSheets.retrieve(
   *     'ss_01abc2def3ghjkmnpqrs4uvwxy',
   *   );
   * ```
   */
  retrieve(structuredSheetsID: string, options?: RequestOptions): APIPromise<StructuredSheetResponse> {
    return this._client.get(path`/v1/structured-sheets/${structuredSheetsID}`, options);
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
   * Delete a structured sheets conversion and its associated exports. This action
   * cannot be undone.
   *
   * @example
   * ```ts
   * await client.structuredSheets.delete(
   *   'ss_01abc2def3ghjkmnpqrs4uvwxy',
   * );
   * ```
   */
  delete(structuredSheetsID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/structured-sheets/${structuredSheetsID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type StructuredSheetResponsesCursorIDPage = CursorIDPage<StructuredSheetResponse>;

/**
 * Response representing a structured sheets conversion job.
 *
 * This is returned from POST (create), GET (retrieve), and list endpoints.
 */
export interface StructuredSheetResponse {
  /**
   * The unique identifier for this structured sheets conversion.
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
   * The current processing status.
   */
  status: 'pending' | 'queued' | 'in_progress' | 'completed' | 'failed' | 'cancelled';

  /**
   * The timestamp when the conversion was last updated.
   */
  updated_at: string;

  /**
   * List of export formats available for download (e.g., ['sqlite']).
   */
  exports_available?: Array<string>;

  /**
   * Error information when processing fails.
   */
  last_error?: StructuredSheetResponse.LastError | null;

  /**
   * The object type, which is always 'structured_sheet'.
   */
  object?: 'structured_sheet';

  /**
   * List of sheet names included in this conversion.
   */
  sheet_names?: Array<string>;
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

StructuredSheets.Exports = Exports;

export declare namespace StructuredSheets {
  export {
    type StructuredSheetResponse as StructuredSheetResponse,
    type StructuredSheetResponsesCursorIDPage as StructuredSheetResponsesCursorIDPage,
    type StructuredSheetCreateParams as StructuredSheetCreateParams,
    type StructuredSheetListParams as StructuredSheetListParams,
  };

  export { Exports as Exports };
}
