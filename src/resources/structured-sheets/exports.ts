// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Exports extends APIResource {
  /**
   * Download the structured data as a SQLite database file. Only available when
   * conversion status is 'completed'.
   *
   * @example
   * ```ts
   * const response =
   *   await client.structuredSheets.exports.downloadSqlite(
   *     'ss_01abc2def3ghjkmnpqrs4uvwxy',
   *   );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  downloadSqlite(structuredSheetsID: string, options?: RequestOptions): APIPromise<Response> {
    return this._client.get(path`/v1/structured-sheets/${structuredSheetsID}/exports/sqlite`, {
      ...options,
      headers: buildHeaders([{ Accept: 'application/x-sqlite3' }, options?.headers]),
      __binaryResponse: true,
    });
  }
}
