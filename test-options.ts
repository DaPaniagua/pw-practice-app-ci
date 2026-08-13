import {test as base} from '@playwright/test';
import {PageManager} from './page-objects/page-manager';

export type TestOptions = {
    globalsQaURL : string;
    formLayoutsPage: string;
    pageManager: PageManager;
}

export const test = base.extend<TestOptions>({
    globalsQaURL: [ '', { option: true } ],

    //Option #1: Using the page object method to navigate to the Form Layouts page before each test*/
    /*formLayoutsPage: async ({ page }, use) => {
        await page.goto('/');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        await use('');
    }*/

    //Option #2: Using the page object method to navigate to the Form Layouts page before each test with auto:true - It will be executed even before-each or before-all hooks*/
    /*formLayoutsPage: [async ({ page }, use) => {
        await page.goto('/');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        await use('');
    }, {auto: true}],*/

    formLayoutsPage: async ({ page }, use) => {
        await page.goto('/');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        await use('');
    },

    pageManager: async ({page, formLayoutsPage}, use) => {
        const pm = new PageManager(page);
        await use(pm);
    }
});