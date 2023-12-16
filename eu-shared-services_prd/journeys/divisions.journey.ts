import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('DS - API Journey | Divisions - prd', async ({ context }: { context: any }) => {
  monitor.use({
    id: 'Divisions',
    schedule: 30,
    screenshot: 'off',
  });

  step('GET - Brands', async () => {
    const brandResponse = await context.request.get('https://divisions.prd.shared-services.eu.pvh.cloud/v1/brands');
    const brandBody = await brandResponse.json();
    console.log(JSON.stringify(brandBody));

    verifyResponse(brandResponse, 200);
    verifyResponseStructure(brandBody);
    verifyCompanyDetails(brandBody);
  });

  step('GET - Divisions for a Brand', async () => {
    const divisionResponse = await context.request.get('https://divisions.prd.shared-services.eu.pvh.cloud/v1/divisions/TH/division/01');
    const divisionBody = await divisionResponse.json();
    console.log(JSON.stringify(divisionBody));

    verifyResponse(divisionResponse, 200);
    verifyResponseStructureDivisionBrand(divisionBody);
    validateDateFields(divisionBody);
  });

  step('GET - Season for a Brand', async () => {
    const seasonResponse = await context.request.get('https://divisions.prd.shared-services.eu.pvh.cloud/v1/divisions/TH/division/01/seasons/C41');
    const seasonBody = await seasonResponse.json();
    console.log(JSON.stringify(seasonBody));

    verifyResponse(seasonResponse, 200);
    verifyResponseStructureSeasonBrand(seasonBody);
    validateDateValuesSeasonBrand(seasonBody);
  });

  function verifyResponse(response, expectedStatusCode) {
    expect(response.status()).toBe(expectedStatusCode);
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

    // Verify details for each company code
    const companyDetails = [
      {
        companyCode: 'CKEU',
        name: 'Calvin Klein',
        divisionCodes: ['61', '62', '63', '65', '67', '68', '69', '70', '71', '72', '77'],
        salesOrganizationCodes: ['CK07', 'INCK'],
      },
      {
        companyCode: 'THEU',
        name: 'Tommy Hilfiger',
        divisionCodes: ['01','02','03','04','05','07','08','09','10','11','18'],
        salesOrganizationCodes: ['THE1', 'INLC'],
      },
      {
        companyCode: 'IZEU',
        name: 'IZOD',
        divisionCodes: ['92'],
        salesOrganizationCodes: ['PBE1'],
      },
      {
        companyCode: 'MK',
        name: 'Michael Kors',
        divisionCodes: ['91'],
        salesOrganizationCodes: ['PBE1'],
      },
    ];

    for (const detail of companyDetails) {
      const company = items.find((item) => item.companyCode === detail.companyCode);
      expect(company).toBeDefined();
      expect(company.name).toBe(detail.name);
      expect(company.divisionCodes).toEqual(expect.arrayContaining(detail.divisionCodes));
      expect(company.salesOrganizationCodes).toEqual(expect.arrayContaining(detail.salesOrganizationCodes));
    }
  }

  function verifyResponseStructureDivisionBrand(responseBody) {
    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('code');
    expect(responseBody).toHaveProperty('weCTimestamp');
    expect(responseBody).toHaveProperty('modifiedOn');
    expect(responseBody).toHaveProperty('seasons');
    expect(Array.isArray(responseBody.seasons)).toBe(true);
  }

  function validateDateFields(responseBody) {
    const dateFields = ['weCTimestamp', 'modifiedOn'];
    for (const field of dateFields) {
      const fieldValue = new Date(responseBody[field]);
      expect(fieldValue).toBeInstanceOf(Date);
      expect(!isNaN(fieldValue)).toBe(true);
    }
  }

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

    const dateFields = season.orderFulfillmentTypes.map((type) => type.deliveryDates).flat();
    for (const date of dateFields) {
      const parsedDate = new Date(date);
      expect(parsedDate).toBeInstanceOf(Date);
      expect(!isNaN(parsedDate)).toBe(true);
    }
  }
});
