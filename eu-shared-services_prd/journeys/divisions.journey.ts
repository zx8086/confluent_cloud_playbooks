import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('DS - API Journey | Divisions - prd', async ({ context }: { context: any }) => {
  monitor.use({
    id: 'Divisions',
    schedule: 30,
    screenshot: 'off',
  });

  step('GET Brands API', async () => {
    const response = await context.request.get('https://divisions.prd.shared-services.eu.pvh.cloud/v1/brands');

    // Verify the response
    const body = await response.json();
    console.log(JSON.stringify(body));

    // Verify the status code
    verifyStatusCode(response);

    // Parse the JSON response
    const responseBody = await response.json();

    // Verify the response structure and content
    verifyResponseStructure(responseBody);

    // Verify specific details in the JSON response
    verifyCompanyDetails(responseBody);
  });

  step('GET Divisions for a Brand API', async () => {
    const response = await context.request.get('https://divisions.prd.shared-services.eu.pvh.cloud/v1/divisions/TH/division/01');

    // Verify the response
    const body = await response.json();
    console.log(JSON.stringify(body));

    // Verify the status code
    expect(response.status()).toBe(200);

    // Parse the JSON response
    const responseBody = await response.json();

    // Verify the response structure
    verifyResponseStructureDivisionBrand(responseBody);

    // Step 4: Validate date fields as dates
    validateDateFields(responseBody);
  });

  step('GET a season for a brand', async () => {
    const response = await context.request.get('https://divisions.prd.shared-services.eu.pvh.cloud/v1/divisions/TH/division/01/seasons/C41');

    // Verify the response
    const body = await response.json();
    console.log(JSON.stringify(body));

    // Verify the status code
    expect(response.status()).toBe(200);

    // Parse the JSON response
    const responseBody = await response.json();

    // Verify the response structure
    verifyResponseStructureSeasonBrand(responseBody);

    // Validate date values in orderFulfillmentTypes
    validateDateValuesSeasonBrand(responseBody);
  });

  // Get Seasons for a Brand
  function verifyResponseStructureSeasonBrand(responseBody) {
    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('code');
    expect(responseBody).toHaveProperty('seasons');
    expect(Array.isArray(responseBody.seasons)).toBe(true);
  }

  function validateDateValuesSeasonBrand(responseBody) {
    const seasons = responseBody.seasons;
    expect(seasons).toHaveLength(1);

    const season = seasons[0];
    expect(season).toHaveProperty('name');
    expect(season).toHaveProperty('styleSeasonCode');
    expect(season).toHaveProperty('orderFulfillmentTypes');
    expect(Array.isArray(season.orderFulfillmentTypes)).toBe(true);

    const orderFulfillmentTypes = season.orderFulfillmentTypes;
    for (const type of orderFulfillmentTypes) {
      expect(type).toHaveProperty('code');
      expect(type).toHaveProperty('deliveryDates');
      expect(Array.isArray(type.deliveryDates)).toBe(true);

      // Validate date values in deliveryDates
      for (const date of type.deliveryDates) {
        const parsedDate = new Date(date);
        expect(parsedDate).toBeInstanceOf(Date);
        expect(!isNaN(parsedDate)).toBe(true);
      }
    }
  }

// GET Brands API
  function verifyStatusCode(response) {
    expect(response.status()).toBe(200);
  }

  function verifyResponseStructure(responseBody) {
    expect(responseBody).toHaveProperty('items');
    expect(Array.isArray(responseBody.items)).toBe(true);
    expect(responseBody).toHaveProperty('count');
    expect(typeof responseBody.count).toBe('number');
    expect(responseBody).toHaveProperty('hasNextPage');
    expect(typeof responseBody.hasNextPage).toBe('boolean');
    expect(responseBody).toHaveProperty('skipToken');
  }

  function verifyCompanyDetails(responseBody) {
    const items = responseBody.items;
    expect(items).toHaveLength(7);

    // Example: Verify details for a specific company (e.g., Calvin Klein)
    const calvinKlein = items.find((item) => item.companyCode === 'CKEU');
    expect(calvinKlein).toBeDefined();
    expect(calvinKlein.name).toBe('Calvin Klein');
    expect(calvinKlein.divisionCodes).toContain('61');
    expect(calvinKlein.divisionCodes).toContain('62');
    expect(calvinKlein.divisionCodes).toContain('63');
    expect(calvinKlein.divisionCodes).toContain('65');
    expect(calvinKlein.divisionCodes).toContain('67');
    expect(calvinKlein.divisionCodes).toContain('68');
    expect(calvinKlein.divisionCodes).toContain('69');
    expect(calvinKlein.divisionCodes).toContain('70');
    expect(calvinKlein.divisionCodes).toContain('71');
    expect(calvinKlein.divisionCodes).toContain('72');
    expect(calvinKlein.divisionCodes).toContain('77');
    expect(calvinKlein.salesOrganizationCodes).toContain('CK07');
    expect(calvinKlein.salesOrganizationCodes).toContain('INCK');

    // Verify details for IZOD
    const izod = items.find((item) => item.companyCode === 'IZEU');
    expect(izod).toBeDefined();
    expect(izod.name).toBe('IZOD');
    expect(izod.divisionCodes).toContain('92');
    expect(izod.salesOrganizationCodes).toContain('PBE1');

    // Verify details for Michael Kors
    const michaelKors = items.find((item) => item.companyCode === 'MK');
    expect(michaelKors).toBeDefined();
    expect(michaelKors.name).toBe('Michael Kors');
    expect(michaelKors.divisionCodes).toContain('91');
    expect(michaelKors.salesOrganizationCodes).toContain('PBE1');

    // Verify details for NIKE
    const nike = items.find((item) => item.companyCode === 'NIKE');
    expect(nike).toBeDefined();
    expect(nike.name).toBe('NIKE');
    expect(nike.divisionCodes).toContain('97');
    expect(nike.salesOrganizationCodes).toContain('PBE1');

    // Verify details for Tommy Hilfiger
    const tommyHilfiger = items.find((item) => item.companyCode === 'THEU');
    expect(tommyHilfiger).toBeDefined();
    expect(tommyHilfiger.name).toBe('Tommy Hilfiger');
    expect(tommyHilfiger.divisionCodes).toContain('01');
    expect(tommyHilfiger.divisionCodes).toContain('02');
    expect(tommyHilfiger.divisionCodes).toContain('03');
    expect(tommyHilfiger.divisionCodes).toContain('04');    
    expect(tommyHilfiger.divisionCodes).toContain('05');
    expect(tommyHilfiger.divisionCodes).toContain('07');
    expect(tommyHilfiger.divisionCodes).toContain('09');
    expect(tommyHilfiger.divisionCodes).toContain('10');
    expect(tommyHilfiger.divisionCodes).toContain('11');
    expect(tommyHilfiger.divisionCodes).toContain('18');
    expect(tommyHilfiger.salesOrganizationCodes).toContain('THE1');
    expect(tommyHilfiger.salesOrganizationCodes).toContain('INLC');    
  }

  // GET Divisions for a Brand API
  function verifyResponseStructureDivisionBrand(responseBody) {
    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('code');
    expect(responseBody).toHaveProperty('weCTimestamp');
    expect(responseBody).toHaveProperty('modifiedOn');
    expect(responseBody).toHaveProperty('seasons');
    expect(Array.isArray(responseBody.seasons)).toBe(true);
  }

  function validateDateFields(responseBody) {
    // Validate "weCTimestamp" as a Date object
    const weCTimestamp = new Date(responseBody.weCTimestamp);
    expect(weCTimestamp).toBeInstanceOf(Date);
    expect(!isNaN(weCTimestamp)).toBe(true);

    // Validate "modifiedOn" as a Date object
    const modifiedOn = new Date(responseBody.modifiedOn);
    expect(modifiedOn).toBeInstanceOf(Date);
    expect(!isNaN(modifiedOn)).toBe(true);
  }

});