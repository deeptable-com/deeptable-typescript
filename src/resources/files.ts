// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorIDPage, type CursorIDPageParams, PagePromise } from '../core/pagination';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Files extends APIResource {
  /**
   * Get metadata for a specific file.
   *
   * @example
   * ```ts
   * const file = await client.files.retrieve(
   *   'file_01kfxgjd94fn9stqm414vjb0s8',
   * );
   * ```
   */
  retrieve(fileID: string, options?: RequestOptions): APIPromise<File> {
    return this._client.get(path`/v1/files/${fileID}`, options);
  }

  /**
   * List all files uploaded by the current user.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const file of client.files.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FilesCursorIDPage, File> {
    return this._client.getAPIList('/v1/files', CursorIDPage<File>, { query, ...options });
  }

  /**
   * Delete a file. This cannot be undone.
   *
   * @example
   * ```ts
   * const file = await client.files.delete(
   *   'file_01kfxgjd94fn9stqm414vjb0s8',
   * );
   * ```
   */
  delete(fileID: string, options?: RequestOptions): APIPromise<FileDeleteResponse> {
    return this._client.delete(path`/v1/files/${fileID}`, options);
  }

  /**
   * Download the original uploaded file content.
   *
   * @example
   * ```ts
   * const response = await client.files.download(
   *   'file_01kfxgjd94fn9stqm414vjb0s8',
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  download(fileID: string, options?: RequestOptions): APIPromise<Response> {
    return this._client.get(path`/v1/files/${fileID}/content`, {
      ...options,
      headers: buildHeaders([
        { Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
        options?.headers,
      ]),
      __binaryResponse: true,
    });
  }

  /**
   * Upload an Excel spreadsheet file for later processing.
   *
   * Supported formats:
   *
   * - Excel (.xlsx)
   *
   * Maximum file size: 100 MB
   *
   * @example
   * ```ts
   * const file = await client.files.upload({
   *   file: fs.createReadStream('path/to/file'),
   * });
   * ```
   */
  upload(body: FileUploadParams, options?: RequestOptions): APIPromise<File> {
    return this._client.post('/v1/files', multipartFormRequestOptions({ body, ...options }, this._client));
  }
}

export type FilesCursorIDPage = CursorIDPage<File>;

/**
 * Response representing an uploaded file.
 *
 * This is returned from POST (upload), GET (retrieve), and list endpoints.
 */
export interface File {
  /**
   * The unique identifier for this file.
   */
  id: string;

  /**
   * The MIME type of the file.
   */
  content_type: string;

  /**
   * The timestamp when the file was uploaded.
   */
  created_at: string;

  /**
   * The original filename of the uploaded file.
   */
  file_name: string;

  /**
   * The object type, which is always 'file'.
   */
  object: 'file';

  /**
   * The size of the file in bytes.
   */
  size: number;
}

/**
 * Response from deleting a file.
 *
 * Following the OpenAI API convention for delete responses.
 */
export interface FileDeleteResponse {
  /**
   * The unique identifier of the deleted file.
   */
  id: string;

  /**
   * Whether the file was successfully deleted.
   */
  deleted: true;

  /**
   * The object type, which is always 'file'.
   */
  object: 'file';
}

export interface FileListParams extends CursorIDPageParams {}

export interface FileUploadParams {
  /**
   * The spreadsheet file to upload
   */
  file: Uploadable;
}

export declare namespace Files {
  export {
    type File as File,
    type FileDeleteResponse as FileDeleteResponse,
    type FilesCursorIDPage as FilesCursorIDPage,
    type FileListParams as FileListParams,
    type FileUploadParams as FileUploadParams,
  };
}
