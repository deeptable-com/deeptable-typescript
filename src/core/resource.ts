// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Deeptable } from '../client';

export abstract class APIResource {
  protected _client: Deeptable;

  constructor(client: Deeptable) {
    this._client = client;
  }
}
