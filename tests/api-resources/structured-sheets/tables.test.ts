// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DeepTable from '@deeptable/deeptable';

const client = new DeepTable({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tables', () => {
  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.structuredSheets.tables.retrieve('tbl_01abc2def3ghjkmnpqrs4uvwxy', {
      structured_sheets_id: 'ss_01abc2def3ghjkmnpqrs4uvwxy',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.structuredSheets.tables.retrieve('tbl_01abc2def3ghjkmnpqrs4uvwxy', {
      structured_sheets_id: 'ss_01abc2def3ghjkmnpqrs4uvwxy',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.structuredSheets.tables.list('ss_01abc2def3ghjkmnpqrs4uvwxy');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('download: required and optional params', async () => {
    const response = await client.structuredSheets.tables.download('tbl_01abc2def3ghjkmnpqrs4uvwxy', {
      structured_sheets_id: 'ss_01abc2def3ghjkmnpqrs4uvwxy',
      format: 'parquet',
    });
  });
});
