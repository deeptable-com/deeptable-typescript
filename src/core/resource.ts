// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { DeepTable } from '../client';

export abstract class APIResource {
  protected _client: DeepTable;

  constructor(client: DeepTable) {
    this._client = client;
  }
}
