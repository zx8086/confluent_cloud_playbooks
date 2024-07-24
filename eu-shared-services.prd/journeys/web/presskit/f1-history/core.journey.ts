import {journey, monitor, step} from '@elastic/synthetics';

journey('MT - PressKit Journey | F1 History (core) - prd', async ({ page }) => {
    monitor.use({
        id: 'Presskit_F1_History',
        schedule: 30,
        screenshot: 'on',
        throttling: false,
        tags: ['production', 'marketing_technology', 'eu-shared-services', 'presskit', 'f1-history'],
    });

    const baseUrl = 'https://www.prd.presskits.eu.pvh.cloud/f1-history/';

    step('Go to F1 History homepage', async () => {
        await page.goto(baseUrl);
    });

    step('Open main content', async () => {
        await page.locator('#trigger').click();
    });

    step('Navigate to "From runway to raceway" section', async () => {
        await page.getByRole('link', { name: 'From runway to raceway TH is creating capsules with legends of the sport, breaking convention with disruptive partnership activations, and designing collections inspired by the track.' }).click();
    });

    step('Return to main content', async () => {
        await page.locator('#trigger').click();
    });

    step('Navigate to "Tommy Hilfiger Formula 1 history" section', async () => {
        await page.locator('li').filter({ hasText: 'Tommy HilfigerFormula 1 history From 1991 to present' }).click();
    });

    step('Return to main content', async () => {
        await page.locator('#trigger').click();
    });

    step('Navigate to "Fashion meets motor sport" section', async () => {
        await page.getByRole('link', { name: 'Fashion meets motor sport The drive, dedication and passion embodied by sport stars has been at the core of Tommy Hilfiger\'s brand heritage since its beginning.' }).click();
    });

    step('Return to main content', async () => {
        await page.locator('#trigger').click();
    });

    step('Navigate to "About Tommy" section', async () => {
        await page.getByRole('link', { name: 'About Tommy Principal Designer, Tommy Hilfiger Global' }).click();
    });

    step('Return to main content', async () => {
        await page.locator('#trigger').click();
    });

    step('Navigate to "Contacts" section', async () => {
        await page.getByRole('link', { name: 'Contacts PR contacts and image requests' }).click();
    });

    step('Return to main content', async () => {
        await page.locator('#trigger').click();
    });

    step('Navigate back to "From runway to raceway" section', async () => {
        await page.getByRole('link', { name: 'From runway to raceway TH is creating capsules with legends of the sport, breaking convention with disruptive partnership activations, and designing collections inspired by the track.' }).click();
    });
});