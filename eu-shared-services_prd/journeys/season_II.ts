import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('DS - API Journey | Seasons - prd', async ({ context }: { context: any }) => {
    monitor.use({
        id: 'Seasons',
        schedule: 30,
        screenshot: 'off',
        // throttling: false,
        tags: ['production', 'digital_selling', 'eu-shared-services'],
    });

    // Define the API endpoint for seasons
    const brandCode = 'TH';
    const divisionCode = '01';
    const seasonCode = 'C41';

    step('GET - Get a season for a brand', async () => {
        const seasonResponse = await context.request.get(`https://seasons.prd.shared-services.eu.pvh.cloud/v2/seasons/${brandCode}/season/${seasonCode}/divisions/${divisionCode}`);
        const seasonBody = await seasonResponse.json(); 
        console.log(JSON.stringify(seasonBody));

        verifyResponse(seasonResponse, 200);
        verifyResponseStructureSeasonBrand(seasonBody);
        validateDateValuesSeasonBrand(seasonBody);
    });

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
