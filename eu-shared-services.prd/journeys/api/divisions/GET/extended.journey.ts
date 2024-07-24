import {expect, journey, monitor, step} from '@elastic/synthetics';

journey('DS - API Journey | Divisions (ext) - prd', async ({ context }: { context: any }) => {
    monitor.use({
        id: 'Divisions_Extended',
        schedule: 30,
        screenshot: 'off',
        throttling: false,
        tags: ['production', 'digital_selling', 'eu-shared-services'],
    });

    // Skipped a few divisions as not able to do soft assertions - TH 06, 08, 11, 18, CK 63, 65, 71, 72
    const brands = [
        {
            brandCode: 'TH',
            divisionCodes: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '07',
                '09',
                '10',
            ],
        },
        {
            brandCode: 'CK',
            divisionCodes: [
                '61',
                '62',
                '67',
                '68',
                '69',
                '70',
                '77',
            ],
        },
        {
            brandCode: 'NIKE',
            divisionCodes: [
                '97',
            ],
        },
    ];

    let stepCount = 0;

    for (const brand of brands) {
        const brandCode = brand.brandCode;
        for (const divisionCode of brand.divisionCodes) {
            stepCount++;
            step(`Step ${stepCount}: GET - Get Division ${divisionCode} for Brand ${brandCode}`, async () => {
                const divisionResponse = await context.request.get(
                    `https://divisions.prd.shared-services.eu.pvh.cloud/v1/divisions/${brandCode}/division/${divisionCode}`
                );
                const divisionBody = await divisionResponse.json();
                console.log(`Division data for brand ${brandCode} and division ${divisionCode}:`, JSON.stringify(divisionBody));

                verifyResponse(divisionResponse, 200);
                verifyResponseStructureDivisionBrand(divisionBody);
                validateDateFields(divisionBody);
            });
        }
    }

    function verifyResponse(response, expectedStatusCode) {
        expect(response.status()).toBe(expectedStatusCode);
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
});
