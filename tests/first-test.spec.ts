import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('Locator Syntax Rules', async ({page}) => {
    // find element by tag name
    page.locator('input');

    // find element by ID
    page.locator('#inputEmail');

    // find element by class value
    page.locator('.shape-rectangle');

    // find element by any attribute
    page.locator('[placeholder="Email"]');

    // find element by full class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

    // find element by several selectors
    page.locator('input[placeholder="Email"].shape-rectangle');

    // find element by Xpath
    page.locator('//*[@id="inputEmail1"]');

    // find element by partial text match
    page.locator(':text("Using")');

    // find element by exact text match
    page.locator(':text-is("Using the Grid")');
});

test('user-visible locators', async ({page}) => {
    await page.getByRole('button', { name: 'Sign in' }).first().click();
    await page.getByRole('textbox', { name: 'Email' }).first().fill('test@example.com');

    await page.getByLabel('Email').first().fill('test@gmail.com');

    await page.getByPlaceholder('Jane Doe').fill('Joe Smith');  

    await page.getByText('Submit').first().click();

    await page.getByTestId('inputEmail1').fill('test0001@example.com');

    await page.getByTitle('IoT Dashboard').click();
});

test('Locating child elements', async ({page}) => {
    await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 1")').click();
    await page.locator('nb-card nb-radio-group :text-is("Option 2")').click();

    await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click();

    await page.locator('nb-card').nth(3).getByRole('button').click();
});

test('Locating parent elements', async ({page}) => {
    //await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('button').click();
    //await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('button').click();
    //await page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByRole('button').click();
    //await page.locator('nb-card')
    //    .filter({has: page.locator('nb-checkbox')})
    //    .filter({hasText: 'Sign in'})
    //    .getByLabel('Email').fill('test@example.com');
    await page.getByText('Using the Grid').locator('..').getByRole('button').click();
});

test('Reusing locators', async ({page}) => {
    const basicForm = page.locator('nb-card', {hasText: 'Basic form'});
    const emailInputField = basicForm.getByLabel('Email');

    await emailInputField.fill('test@example.com');
    await basicForm.getByLabel('Password').fill('playwirght');
    await basicForm.locator('nb-checkbox').click();  
    await basicForm.getByRole('button').click();

    await expect(emailInputField).toHaveValue('test@example.com');
});

test('Extraction values', async ({page}) => {
    //extracting text
    const basicFormSection = page.locator('nb-card', {hasText: 'Basic form'}); 
    const submitButtonText = await basicFormSection.getByRole('button').textContent();
    expect(submitButtonText).toEqual('Submit');

    //extracting multiple text values
    const allRadioButtonValues = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtonValues).toContain('Option 1');

    //extracting input field value
    const emailInputField = basicFormSection.getByRole('textbox', {name: 'Email'});
    await emailInputField.fill('test@example.com');
    const emailFieldValue = await emailInputField.inputValue();
    expect(emailFieldValue).toEqual('test@example.com');

    //extracting attribute value
    const emailPlaceholder = await emailInputField.getAttribute('placeholder');
});

test('Assertions', async ({page}) => {
    const basicFormSectionButton = page.locator('nb-card', {hasText: 'Basic form'}).getByRole('button');

    //generic assertions
    const value = 5;
    expect(value).toEqual(5);

    const submitButtonText = await basicFormSectionButton.textContent();
    expect(submitButtonText).toEqual('Submit');

    //Locator assertions
    await expect(basicFormSectionButton).toHaveText('Submit');

    //soft assertions
    await expect.soft(basicFormSectionButton).toHaveText('Submit');    
    await expect.soft(basicFormSectionButton).toHaveText('Submitttt');    
    await basicFormSectionButton.click();
});

test('Generated test', async ({page}) => {
    await page.getByRole('textbox', { name: 'Email address' }).fill('test@example.com');
    await page.locator('#exampleInputPassword1').fill('Password123');
    await page.locator('.form-group > .status-basic > .label > .custom-checkbox').click();
    await page.locator('nb-card').filter({ hasText: 'Basic formEmail' }).getByRole('button').click();
});