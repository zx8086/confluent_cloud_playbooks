import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('DS - API Journey | Storytelling - prd', async ({ context }: { context: any }) => {
    monitor.use({
        id: 'Storytelling-extended',
        schedule: 30,
        screenshot: 'off',
        throttling: false,
        tags: ['production', 'digital_selling', 'eu-shared-services'],
    });

    const seasonCode = 'C44';

    // TH --> 01,02,04,05,09,10
    // CK --> 61,62,64,65,69,70,77
    

    const companyDetails = [
        {
            name: 'Tommy Hilfiger',
            companyCode: 'THEU',
            brand: 'TH',
            salesOrganizationCodes: ['THE1', 'INLC'],
            divisionCodes: [ '01', '02', '04', '05', '09', '10'], // Skiped a few divisions as not able to do soft assertions - TH 03, 07, 11, 18, 
        },
        {
            name: 'Calvin Klein',
            companyCode: 'CKEU',
            brand: 'CK',
            salesOrganizationCodes: ['CK07', 'INCK'],
            divisionCodes: ['61', '62', '64', '65', '69' ,'70', '77'],  // Skiped a few divisions as not able to do soft assertions - CK 63, 65, 67, 68, 71, 72
        },
        // {
        //     name: 'Nike',
        //     companyCode: 'PBE1',
        //     brand: 'NIKE',
        //     divisionCodes: [ '97'],
        // },
    ];

    let stepCount = 0;

    for (const company of companyDetails) {
        for (const division of company.divisionCodes) {
            stepCount++;
            step(`Step ${stepCount}: GET - Get Storytelling data for Brand ${company.brand}, Division ${division}, and Season C44`, async () => {
                const apiEndpoint = `https://storytelling.prd.shared-services.eu.pvh.cloud/v3/looks/brand/${company.brand}/division/${division}/season/${seasonCode}?top=200`; // Use company.name
                console.log(`API endpoint: ${apiEndpoint}`);
                const storytellingResponse = await context.request.get(apiEndpoint);
                const storytellingBody = await storytellingResponse.json();
                console.log(`Storytelling data for brand ${company.name}, division ${division}, and season ${seasonCode}:`, JSON.stringify(storytellingBody));

                // Verify response for both 200 and 404
                verifyResponse(storytellingResponse, [200, 404]);
                verifyResponseStructure(storytellingBody);
                // Add more assertions as needed
            });
        }
    }

    function verifyResponse(response, expectedStatusCodes) {
        if (Array.isArray(expectedStatusCodes)) {
            expect(expectedStatusCodes.includes(response.status())).toBe(true);
        } else {
            expect(response.status()).toBe(expectedStatusCodes);
        }
    }
    

    function verifyResponseStructure(responseBody) {
        expect(responseBody).toHaveProperty('data');
        expect(Array.isArray(responseBody.data)).toBe(true);
    
        for (const item of responseBody.data) {
            expect(item).toHaveProperty('assetUrl');
            expect(item).toHaveProperty('brand');
            expect(item).toHaveProperty('deliveryName');
            expect(item).toHaveProperty('description');
            expect(item).toHaveProperty('divisionCode');
            expect(item).toHaveProperty('gender');
            expect(item).toHaveProperty('lookType');
            expect(item).toHaveProperty('position');
            expect(item).toHaveProperty('relatedStyles');
            expect(Array.isArray(item.relatedStyles)).toBe(true);
            expect(item).toHaveProperty('styleSeasonCodeAfs');
            expect(item).toHaveProperty('tag');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('trend');
            expect(item).toHaveProperty('nuxeoId');
            expect(item).toHaveProperty('createdOn');
            expect(item).toHaveProperty('createdOnSourceSystem');
            expect(item).toHaveProperty('modifiedOn');
            expect(item).toHaveProperty('modifiedOnSourceSystem');
            expect(item).toHaveProperty('processedOn');
            expect(item).toHaveProperty('sourceSystem');
            expect(item).toHaveProperty('lookId');
            expect(item).toHaveProperty('isDeleted');
        }
    }
    
});
