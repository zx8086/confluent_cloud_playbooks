import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('DS - API Journey | Seasons - prd', async ({ context }: { context: any }) => {
    monitor.use({
        id: 'Seasons',
        schedule: 30,
        screenshot: 'off',
        throttling: false,
        tags: ['production', 'digital_selling', 'eu-shared-services'],
    });

    // Define the API base URL
    const baseUrl = 'https://api-beta.pvhcorp.com'; // Update with the correct base URL

    // Define parameters for your test cases
    const brand = 'TH';
    const divisionCode = '01';
    const styleSeasonCodeAFS = 'C41';
    const styleSeasonCodeFMS = 'D42';
    const salesOrganizationCode = 'INLC';
    const offset = '2023-01-01T00:00:00Z';

    // Test case 1: Get delivery dates for a brand's season (styleSeasonCodeFMS)
    step('GET - Get delivery dates for a brand\'s season (styleSeasonCodeFMS)', async () => {
        const endpoint = `/v2/seasons/${brand}/season/${styleSeasonCodeFMS}/division/${divisionCode}/salesorganization/${salesOrganizationCode}/deliverydates`;
        const response = await context.request.get(`${baseUrl}${endpoint}`);

        verifyResponse(response, 200);
    });

    // Test case 2: Get delivery dates for a brand's season (styleSeasonCodeAFS)
    step('GET - Get delivery dates for a brand\'s season (styleSeasonCodeAFS)', async () => {
        const endpoint = `/v2/seasons/${brand}/season/${styleSeasonCodeAFS}/division/${divisionCode}/salesorganization/${salesOrganizationCode}/deliverydates`;
        const response = await context.request.get(`${baseUrl}${endpoint}`);

        verifyResponse(response, 200);
    });

    // Test case 3: Get all seasons for a brand
    step('GET - Get all seasons for a brand', async () => {
        const endpoint = `/v2/seasons/${brand}/seasons`;
        const response = await context.request.get(`${baseUrl}${endpoint}`);

        verifyResponse(response, 200);
    });

    // Test case 4: Get a specific season for a brand (styleSeasonCodeAFS)
    step('GET - Get a specific season for a brand (styleSeasonCodeAFS)', async () => {
        const endpoint = `/v2/seasons/${brand}/season/${styleSeasonCodeAFS}`;
        const response = await context.request.get(`${baseUrl}${endpoint}`);

        verifyResponse(response, 200);
    });

    // Test case 5: Get a specific season for a brand (styleSeasonCodeFMS)
    step('GET - Get a specific season for a brand (styleSeasonCodeFMS)', async () => {
        const endpoint = `/v2/seasons/${brand}/season/${styleSeasonCodeFMS}`;
        const response = await context.request.get(`${baseUrl}${endpoint}`);

        verifyResponse(response, 200);
    });

    // Test case 6: Get a specific season for a brand with divisions (styleSeasonCodeFMS and divisionCode)
    step('GET - Get a specific season for a brand with divisions (styleSeasonCodeFMS and divisionCode)', async () => {
        const endpoint = `/v2/seasons/${brand}/season/${styleSeasonCodeFMS}/divisions/${divisionCode}`;
        const response = await context.request.get(`${baseUrl}${endpoint}`);

        verifyResponse(response, 200);
    });

    // Test case 7: Get a specific season for a brand with divisions (styleSeasonCodeAFS and divisionCode)
    step('GET - Get a specific season for a brand with divisions (styleSeasonCodeAFS and divisionCode)', async () => {
        const endpoint = `/v2/seasons/${brand}/season/${styleSeasonCodeAFS}/divisions/${divisionCode}`;
        const response = await context.request.get(`${baseUrl}${endpoint}`);

        verifyResponse(response, 200);
    });

    // Test case 8: Get seasons delta by offset
    step('GET - Get seasons delta by offset', async () => {
        const endpoint = `/v2/seasons/seasonsdelta/${offset}`;
        const response = await context.request.get(`${baseUrl}${endpoint}`);

        verifyResponse(response, 200);
    });

    function verifyResponse(response, expectedStatusCode) {
        expect(response.status()).toBe(expectedStatusCode);
    }
});
