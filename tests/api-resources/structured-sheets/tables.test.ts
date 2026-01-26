// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DeepTable from '@deeptable/deeptable';

const client = new DeepTable({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tables', () => {
  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.structuredSheets.tables.retrieve('tbl_01kfxgjd94fn9stqm45rqr2pnz', {
      structured_sheets_id: 'ss_01kfxgjd94fn9stqm42nejb627',
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
    const response = await client.structuredSheets.tables.retrieve('tbl_01kfxgjd94fn9stqm45rqr2pnz', {
      structured_sheets_id: 'ss_01kfxgjd94fn9stqm42nejb627',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.structuredSheets.tables.list('ss_01kfxgjd94fn9stqm42nejb627');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.structuredSheets.tables.list(
        'ss_01kfxgjd94fn9stqm42nejb627',
        { after: 'tbl_01kfxgjd94fn9stqm45rqr2pnz', limit: 20 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DeepTable.NotFoundError);
  });

  test('download: required and optional params', async () => {
    const response = await client.structuredSheets.tables.download('tbl_01kfxgjd94fn9stqm45rqr2pnz', {
      structured_sheets_id: 'ss_01kfxgjd94fn9stqm42nejb627',
      format: 'parquet',
    });
  });
});
