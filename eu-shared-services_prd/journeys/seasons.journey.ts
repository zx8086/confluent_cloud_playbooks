import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('DS - API Journey | Seasons - prd', async ({ context }: { context: any }) => {
    monitor.use({
        id: 'Seasons',
        schedule: 30,
        screenshot: 'off',
        throttling: false,
        tags: ['production', 'digital_selling', 'eu-shared-services'],
    });

    // Define the season code
    const seasonCode = 'C41';

    const brands = [
      {
        brandCode: 'CK',
        divisionCodes: ['61', '62', '63', '65', '67', '68', '69', '70', '71', '72', '77'],
      },
      {
        brandCode: 'TH',
        divisionCodes: ['01', '02', '03', '04', '05', '07', '08', '09', '10', '11', '18'],
      }
    ];

    for (const brand of brands) {
      const brandCode = brand.brandCode;

      for (const divisionCode of brand.divisionCodes) {
        // Construct the API endpoint for the current brand and division
        const apiEndpoint = `https://seasons.prd.shared-services.eu.pvh.cloud/v2/seasons/${brandCode}/season/${seasonCode}/divisions/${divisionCode}`;

        step(`GET - Get a season for brand ${brandCode} and division ${divisionCode}`, async () => {
          const seasonResponse = await context.request.get(apiEndpoint);
          const seasonBody = await seasonResponse.json();
          console.log(`Season data for brand ${brandCode} and division ${divisionCode}:`, JSON.stringify(seasonBody));

          verifyResponse(seasonResponse, 200);
          verifyResponseStructureSeasonBrand(seasonBody);
          validateDateValuesSeasonBrand(seasonBody);
        });
      }
    }

    function verifyResponse(response, expectedStatusCode) {
        expect(response.status()).toBe(expectedStatusCode);
    }

    function verifyResponseStructureSeasonBrand(responseBody) {
        expect(responseBody).toHaveProperty('items');
        expect(Array.isArray(responseBody.items)).toBe(true);
        expect(responseBody).toHaveProperty('count');
        expect(typeof responseBody.count).toBe('number');
        expect(responseBody).toHaveProperty('hasNextPage');
        expect(typeof responseBody.hasNextPage).toBe('boolean');
        expect(responseBody).toHaveProperty('skipToken');
    }

    function validateDateValuesSeasonBrand(responseBody) {
        const items = responseBody.items;
        for (const item of items) {
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('divisionCode');
            expect(item).toHaveProperty('salesOrganizationCode');
            expect(item).toHaveProperty('styleSeasonCodeAFS');
            expect(Array.isArray(item.divisions)).toBe(true);

            // Validate date fields
            const dateFields = ['startOrderEntry', 'endOrderEntry', 'modifiedOn'];
            for (const field of dateFields) {
                const fieldValue = new Date(item[field]);
                expect(fieldValue).toBeInstanceOf(Date);
                expect(!isNaN(fieldValue)).toBe(true);
            }
        }
    }
});
