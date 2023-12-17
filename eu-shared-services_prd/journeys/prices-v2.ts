import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('Prices API Journey', async ({ context }: { context: any }) => {
  monitor.use({
    id: 'Prices',
    schedule: 30,
    screenshot: 'off',
  });

  const baseUrl = 'https://prices-api-v2.stg.shared-services.eu.pvh.cloud/v2'; // Adjust the base URL accordingly

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

  // Step 1: Get Prices by Sales Organization
  step('POST - Get Prices by Sales Organization', async () => {
    const salesOrganization = 'THE1'; // Replace with actual Sales Organization
    const requestBody = {
      optionCodes: ['MW0MW18949BDS', 'MW0MW207570A5'], // Replace with actual option codes
    };
    const response = await fetchApiData(`${baseUrl}/prices/organizations/${salesOrganization}`, requestBody);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    verifyResponse(response, 200);
    verifyResponseStructure(responseBody);
    // Additional validations specific to this endpoint
    // ...
  });

  // Step 2: Get Prices by Options
  step('POST - Get Prices by Options', async () => {
    const salesOrganization = 'THE1'; // Replace with actual Sales Organization
    const distributionChannel = '01'; // Replace with actual Distribution Channel
    const priceListCode = '01'; // Replace with actual Price List Code
    const currency = 'EUR'; // Replace with actual Currency
    const requestBody = {
      optionCodes: ['MW0MW18949BDS', 'MW0MW207570A5'], // Replace with actual option codes
    };
    const response = await fetchApiData(`${baseUrl}/prices/organizations/${salesOrganization}/distributionChannel/${distributionChannel}/priceListCode/${priceListCode}/currency/${currency}`, requestBody);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    verifyResponse(response, 200);
    verifyResponseStructure(responseBody);
    // Additional validations specific to this endpoint
    // ...
  });

  // Step 3: Get Prices by Option
  step('GET - Get Prices by Option', async () => {
    const salesOrganization = 'THE1'; // Replace with actual Sales Organization
    const distributionChannel = '01'; // Replace with actual Distribution Channel
    const priceListCode = '01'; // Replace with actual Price List Code
    const currency = 'EUR'; // Replace with actual Currency
    const optionCode = 'MW0MW13291BDS'; // Replace with actual Option Code
    const response = await context.request.get(`${baseUrl}/prices/organizations/${salesOrganization}/distributionChannel/${distributionChannel}/priceListCode/${priceListCode}/currency/${currency}/${optionCode}`);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    verifyResponse(response, 200);
    // Additional validations specific to this endpoint
    // ...
  });
});
