import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('DS - Browser Journey | data-report.pvhcorp.com - prd ', async ({ page, context }: { page: Page; context: any }) => {
  monitor.use({
    id: 'data-report.pvhcorp.com',
    schedule: 60,
    throttling: {
      download: 10,
      upload: 5,
      latency: 100,
    },
  });
  step('Step 1: Go to https://data-report.pvhcorp.com/', async () => {
    await page.goto('https://data-report.pvhcorp.com/');
  });
  
  step('Step 2: Click on "Fall 2024"', async () => {
    await page.getByRole('link', { name: 'Fall 2024', exact: true }).click();
    await page.waitForTimeout(7000);
  });

  step('Step 3: Click on "Core"', async () => {
    await page.getByRole('link', { name: 'Core', exact: true }).first().click();
    await page.waitForTimeout(10000);
  });

  step('Step 4: Click on "C43"', async () => {
    await page.getByRole('link', { name: 'C43' }).click();
  });

  step('Step 5: Click on "Image Status"', async () => {
    await page.getByRole('link', { name: 'Image Status' }).click();
    await page.waitForTimeout(10000);
  });

  step('Step 6: Click on "C43" (again)', async () => {
    await page.getByRole('link', { name: 'C43' }).click();
  });

  step('Step 7: Click on "TH Menswear Styles"', async () => {
    await page.getByRole('link', { name: 'TH Menswear Styles' }).click();
    await page.waitForTimeout(7000);
  });

  step('Step 8: Click on "C43" (again)', async () => {
    await page.getByRole('link', { name: 'C43' }).click();
  });

  step('Step 9: Click on "|TH Menswear Looks"', async () => {
    await page.getByRole('link', { name: '|TH Menswear Looks' }).click();
    await page.waitForTimeout(10000);
  });

  step('Step 10: Click on "C43" (again)', async () => {
    await page.getByRole('link', { name: 'C43' }).click();
  });

  step('Step 11: Click on "|TH Menswear Compare options"', async () => {
    await page.getByRole('link', { name: '|TH Menswear Compare options' }).click();
    await page.waitForTimeout(7000);
  });

  step('Step 12: Click on "Back to Top"', async () => {
    await page.getByRole('link', { name: 'back to top' }).click();
  });

  step('Step 13: Click on "Search"', async () => {
    await page.locator('div').filter({ hasText: 'Search' }).nth(2).click();
  });

  step('Step 14: Fill in the search field with "MW0MW108"', async () => {
    await page.getByPlaceholder('Type a name or a number').fill('MW0MW108');
    await page.waitForTimeout(10000);
  });

  step('Step 15: Click on "C43"', async () => {
    await page.getByRole('link', { name: 'C43' }).click();
  });

  step('Step 16: Click on "Dashboard"', async () => {
    await page.getByRole('link', { name: 'Dashboard' }).click();
  });
});
