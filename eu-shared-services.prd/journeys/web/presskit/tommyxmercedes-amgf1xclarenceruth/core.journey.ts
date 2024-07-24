import {journey, monitor, step} from '@elastic/synthetics';

journey('MT - PressKit Journey | tommyxmercedes (core) - prd', async ({ page }) => {
    monitor.use({
        id: 'Presskit_tommyxmercedes-amgf1xclarenceruth',
        schedule: 30,
        screenshot: 'on',
        throttling: false,
        tags: ['production', 'marketing_technology', 'eu-shared-services', 'presskit'],
    });

    const baseUrl = 'https://www.prd.presskits.eu.pvh.cloud/tommyxmercedes-amgf1xclarenceruth/';

    step('Go to homepage', async () => {
        await page.goto(baseUrl);
    });

    step('Navigate to TOMMY HILFIGER BIO', async () => {
        await page.getByRole('link', { name: 'TOMMY HILFIGER BIO' }).click();
    });

    step('Return to menu section', async () => {
        await page.getByRole('link').first().click();
    });

    step('Navigate to CAMPAIGN IMAGES', async () => {
        await page.getByRole('link', { name: 'CAMPAIGN IMAGES' }).click();
    });

    step('Return to menu section', async () => {
        await page.locator('#smoothcont').getByRole('link').click();
    });

    step('Navigate to PRODUCT STILLS', async () => {
        await page.getByRole('link', { name: 'PRODUCT STILLS' }).click();
    });

    step('Return to menu section', async () => {
        await page.locator('#smoothcont').getByRole('link').click();
    });

    step('Navigate to CAMPAIGN VIDEOS', async () => {
        await page.getByRole('link', { name: 'CAMPAIGN VIDEOS' }).click();
    });

    step('Return to menu section', async () => {
        await page.locator('#smoothcont').getByRole('link').click();
    });

    step('Navigate to PRESS CONTACT', async () => {
        await page.getByRole('link', { name: 'PRESS CONTACT' }).click();
    });

    step('Return to homepage', async () => {
        await page.locator('header').getByRole('link').click();
    });
});