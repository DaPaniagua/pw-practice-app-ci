import { test } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';
import {faker} from '@faker-js/faker';
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Navigate to form layoout page @smoke', async ({ page }) => {
    const pageObjectManager = new PageManager(page);

    await pageObjectManager.navigationPage.navigateToFormLayoutPage();
    await pageObjectManager.navigationPage.navigateToDatePickerPage();
    await pageObjectManager.navigationPage.navigateToToasterPage();
    await pageObjectManager.navigationPage.navigateToTooltipPage();
    await pageObjectManager.navigationPage.navigateToSmartTablePage();
});

test('Parametrized page object methods @block', async ({ page }) => {
    const pageObjectManager = new PageManager(page);
    const randomFullName = faker.person.fullName();
    const randomEmail = faker.internet.email({firstName: randomFullName.split(' ')[0], lastName: randomFullName.split(' ')[1]});
    const randomEmail2 = `${randomFullName.replaceAll(' ', '.').toLowerCase()}${faker.number.int(1000)}@example.com`;

    await pageObjectManager.navigationPage.navigateToFormLayoutPage();
    await pageObjectManager.formLayoutsPage.submitUsingTheGridForm(process.env.USERNAME, process.env.PASSWORD, 'Option 2');
    await page.waitForLoadState('networkidle')
    await page.screenshot({path: 'Screenshots/submitUsingTheGridForm.png'});
    await pageObjectManager.formLayoutsPage.submitInLineForm(randomFullName, randomEmail2, true);
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'Screenshots/submitInLineForm.png'});
    const buffer =await page.locator('nb-card', {hasText: "Basic form"}).screenshot();
    console.log(buffer.toString('base64'));
    await pageObjectManager.navigationPage.navigateToDatePickerPage();
    await pageObjectManager.datePickerPage.selectCommonDatepickerFromToday(30);
    await pageObjectManager.datePickerPage.selectDatepickerWithRangeFromToday(5, 10);
});

test.only('testing with argos CI', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.navigationPage.navigateToFormLayoutPage();
    await argosScreenshot(page, "Form Layout Page");
    await pm.navigationPage.navigateToDatePickerPage();
    await argosScreenshot(page, "DatePicker Page");
});
