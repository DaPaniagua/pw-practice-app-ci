import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Dialog').click();
});

test('Auto-waiting', async ({ page }) => {
    const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Open Dialog With Delay' });   
    await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click();

    const dialogContainer = page.locator('nb-dialog-container');
    
    //const dialogHeaderText = await dialogContainer.locator('nb-card-header').textContent();
    const dialogHeaderText = await dialogContainer.locator('nb-card-header').allTextContents();
    expect(dialogHeaderText).toEqual('Friendly reminder');

    await dialogContainer.getByRole('button', { name: 'Ok' }).click();
});

test.skip('Alternative waits', async ({ page }) => {
    const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Open Dialog With Delay' });   
    await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click();
    const dialogContainer = page.locator('nb-dialog-container');
    
    //--wait fot the element
    //await dialogContainer.waitFor();
    //await page.waitForSelector('nb-dialog-container');

    //--wait for API response
    //await page.waitForResponse('https://playground.bondaracademy.com/api/delay/3');
    //await page.waitForResponse('**/delay/*');

    //--wait for load state (NOT RECOMMENDED)
    //await page.waitForLoadState('networkidle');

    //--harcoded wait (NEW EVER USE IT, JUST NEVER)
    //await page.waitForTimeout(3500);

    await expect(dialogContainer.locator('nb-card-header')).toHaveText('Friendly reminder');

    const dialogHeaderText = await dialogContainer.locator('nb-card-header').allTextContents();
    expect(dialogHeaderText).toContain('Friendly reminder');

    await dialogContainer.getByRole('button', { name: 'Ok' }).click();
});

test.skip('Timeout', async ({ page }) => {
    test.setTimeout(12000);
    test.slow();
    const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Open Dialog With Delay' });
    await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click();
    const dialogContainer = page.locator('nb-dialog-container');

    await dialogContainer.getByRole('button', {name: 'Ok'}).click({timeout: 4000});
});
