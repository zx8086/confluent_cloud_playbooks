import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('Prepacks API Journey', async ({ context }: { context: any }) => {
  monitor.use({
    id: 'Prepacks',
    schedule: 30,
    screenshot: 'off',
  });

  const baseUrl = 'https://prepacks.dev.shared-services.eu.pvh.cloud/v1'; // Adjust the base URL accordingly

  // Reusable function to fetch data from the API
  async function fetchApiData(url: string, requestBody: any) {
    return await context.request.post(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  }

  // Reusable function to verify response status code
  function verifyResponse(response, expectedStatusCode) {
    expect(response.status()).toBe(expectedStatusCode);
  }

  // Reusable function to verify response structure
  function verifyResponseStructure(responseBody) {
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
    // Add more validation checks specific to the response structure
  }

  // Step 1: Get Prepacks by Multiple Options
  step('POST - Get Prepacks by Multiple Options', async () => {
    const distributionChannel = '01'; // Replace with actual Distribution Channel
    const salesOrganization = 'THE1'; // Replace with actual Sales Organization
    const requestBody = ['EM0EM00196100', 'FM0FM04169BDS']; // Replace with actual option codes
    const response = await fetchApiData(`${baseUrl}/prepacks/salesOrganization/${salesOrganization}/distributionChannel/${distributionChannel}`, requestBody);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    verifyResponse(response, 200);
    verifyResponseStructure(responseBody);
    // Additional validations specific to this endpoint
    // ...
  });

  // Step 2: Get Prepacks by Option
  step('GET - Get Prepacks by Option', async () => {
    const distributionChannel = '01'; // Replace with actual Distribution Channel
    const salesOrganization = 'THE1'; // Replace with actual Sales Organization
    const option = 'EM0EM00001039'; // Replace with actual Option Code
    const response = await context.request.get(`${baseUrl}/prepacks/salesOrganization/${salesOrganization}/distributionChannel/${distributionChannel}/option/${option}`);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    verifyResponse(response, 200);
    // Additional validations specific to this endpoint
    // ...
  });
});
