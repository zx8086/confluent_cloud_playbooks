import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('Distribution Curve API Journey', async ({ context }: { context: any }) => {
  monitor.use({
    id: 'DistributionCurve',
    schedule: 30,
    screenshot: 'off',
  });

  const baseUrl = 'https://distributioncurves.dev.shared-services.eu.pvh.cloud/v1'; // Adjust the base URL accordingly

  // Reusable function to fetch data from the API
  async function fetchApiData(url: string) {
    return await context.request.get(url);
  }

  // Reusable function to verify response status code
  function verifyResponse(response, expectedStatusCode) {
    expect(response.status()).toBe(expectedStatusCode);
  }

  // Reusable function to verify response structure
  function verifyResponseStructure(responseBody) {
    // Add validation checks specific to the response structure
    expect(responseBody).toHaveProperty('distributionCurveId');
    expect(responseBody).toHaveProperty('isActive');
    expect(responseBody).toHaveProperty('modifiedOn');
    expect(responseBody).toHaveProperty('sizeCode');
    expect(responseBody).toHaveProperty('distributionCurveDetails');
  }

  // Step 1: Get Distribution Curve by ID
  step('GET - Get Distribution Curve by ID', async () => {
    const distributionCurveId = 'M0A'; // Replace with an actual Distribution Curve ID
    const response = await fetchApiData(`${baseUrl}/distributioncurves/${distributionCurveId}`);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    verifyResponse(response, 200);
    verifyResponseStructure(responseBody);
    // Additional validations specific to this endpoint
    // ...
  });
});
