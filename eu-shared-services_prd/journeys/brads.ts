import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('Brands API Journey', async ({ context }: { context: any }) => {
  monitor.use({
    id: 'Brands',
    schedule: 30,
    screenshot: 'off',
  });

  const baseUrl = 'https://brads.dev.shared-services.eu.pvh.cloud/v2';

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
    expect(responseBody).toHaveProperty('data');
    // Add more validation checks specific to the response structure
  }

  // Step 1: Get Brand by Brand Code
  step('GET - Brand by Brand Code', async () => {
    const brandCode = 'your-brand-code'; // Replace with actual Brand Code
    const response = await fetchApiData(`${baseUrl}/brands/${brandCode}`);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    verifyResponse(response, 200);
    verifyResponseStructure(responseBody);
    // Additional validations specific to this endpoint
    // ...
  });

  // Step 2: Get All Brands
  step('GET - All Brands', async () => {
    const response = await fetchApiData(`${baseUrl}/brands`);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    verifyResponse(response, 200);
    verifyResponseStructure(responseBody);
    // Additional validations specific to this endpoint
    // ...
  });

  // Step 3: Get Brand by Brand Code, Sales Organization, and Division Code
  step('GET - Brand by Brand Code, Sales Organization, and Division Code', async () => {
    const brandCode = 'your-brand-code'; // Replace with actual Brand Code
    const salesOrg = 'your-sales-organization'; // Replace with actual Sales Organization
    const divisionCode = 'your-division-code'; // Replace with actual Division Code
    const response = await fetchApiData(`${baseUrl}/support/brands/${brandCode}/salesOrganization/${salesOrg}/division/${divisionCode}`);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    verifyResponse(response, 200);
    verifyResponseStructure(responseBody);
    // Additional validations specific to this endpoint
    // ...
  });
});
