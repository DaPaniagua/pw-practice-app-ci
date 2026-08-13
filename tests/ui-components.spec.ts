import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

//test.describe.only('Form Layout page', () => {
test.describe('Form Layout page', () => {
    test.describe.configure({retries: 0}); //override the global retries for this describe block
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Input fields', async ({page}, testInfo) => {
        if (testInfo.retry) {
            //Do Something if the test is being retried
        }
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', { name: 'Email' });
        await usingTheGridEmailInput.fill('test@example.com');
        await usingTheGridEmailInput.clear();
        //await usingTheGridEmailInput.pressSequentially('test@example.com', {delay: 300});
        await usingTheGridEmailInput.pressSequentially('test@example.com');

        //extract the value
        const inputValue = await usingTheGridEmailInput.inputValue();

        //assertions
        await expect(usingTheGridEmailInput).toHaveValue('test@example.com');
        await expect(usingTheGridEmailInput).toHaveValue(/example.com/)
    });

    test('radio buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"});

        //Generic access - Not Recomended
        await usingTheGridForm.getByLabel('Option 1').check({force: true});
        //Recomended access
        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true});

        //Generic Assertion - Not Recomended
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked();
        expect(radioStatus).toBeTruthy();

        //Specific Assertion - Recomended
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 2"})).toBeChecked();
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).not.toBeChecked();
    });

    test.only('radio buttons visual testing', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"});

        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true});
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked();
        await expect(usingTheGridForm).toHaveScreenshot();
        //expect(radioStatus).toBeTruthy();

        //Specific Assertion - Recomended
        //await expect(usingTheGridForm.getByRole('radio', {name: "Option 2"})).toBeChecked();
        //await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).not.toBeChecked();
    });
});

test('Checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true});     //click the control. If checked, it will uncheck. If unchecked, it will check. 
    await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true});     //check the control. If checked, it will remain checked. If unchecked, it will check.
    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true});   //uncheck the control. If checked, it will uncheck. If unchecked, it will remain unchecked.

    const allCheckBoxes = page.getByRole('checkbox');
    for (const checkBox of await allCheckBoxes.all()) {
        await checkBox.uncheck({force: true});
        await expect(checkBox).not.toBeChecked();
    }
    for (const checkBox of await allCheckBoxes.all()) {
        await checkBox.check({force: true});
        await expect(checkBox).toBeChecked();
    }
});

test('Lists and Dropdowns', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    //standard dropdown
    const standardDropdown = page.locator('.form-group', {hasText: 'Toast type:'}).getByRole('combobox');
    await standardDropdown.selectOption('info');
    await expect(standardDropdown).toHaveValue('info');

    //custom dropdowns
    const customDropdown = page.locator('.form-group', {hasText: 'Position:'}).locator('nb-select');
    await customDropdown.click();
    //option #1
    await page.getByRole('list').getByText('bottom-end').click();
    await expect(customDropdown).toHaveText('bottom-end');
    //option #2
    await customDropdown.click();
    await page.locator('nb-option', {hasText: 'top-end'}).click();
    await expect(customDropdown).toHaveText('top-end');
    //loopinh through all options
    await customDropdown.click();
    const allOptions = page.locator('nb-option').allTextContents();
    for (const option of await allOptions) {
        await page.locator('nb-option', {hasText: option}).click();
        await expect(customDropdown).toHaveText(option);
        await customDropdown.click();
    }
});

test('Tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    await page.getByRole('button', {name: "Top"}).hover();
    await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip');
});

test('Dialog Boxes', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        dialog.accept();
    })

    await page.locator('tr', {hasText: 'snow@gmail.com'}).locator('.nb-trash').click();
    await expect(page.locator('tr', {hasText: 'snow@gmail.com'})).not.toBeVisible();
});

test('Web Tables', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    //1- How to select row by any visible text
    const tableRowByEmail = page.getByRole('row', {name: 'twitter@outlook.com'});
    await tableRowByEmail.locator('.nb-edit').click();
    await tableRowByEmail.getByPlaceholder('Age').fill('35');
    await tableRowByEmail.locator('.nb-checkmark').click();
    await expect(tableRowByEmail.locator('td').last()).toHaveText('35');
    await expect(tableRowByEmail.getByText('35')).toBeVisible();

    //2- How to get row by specific column value
    const tableRowById = page.getByRole('row').filter({has: page.getByRole('cell').nth(1).getByText('10')});
    await tableRowById.locator('.nb-edit').click();
    await page.locator('tbody').getByPlaceholder('E-mail').fill('test@test.com');
    await page.locator('tbody').locator('.nb-checkmark').click();
    await expect(tableRowById.locator('td').nth(5)).toHaveText('test@test.com');

    //3- Loop through table rows
    const ages = ["20", "30", "40", "200"];
    for (let age of ages) {
        await page.getByPlaceholder('Age').fill(age);
        if (age === "200") {
            await expect(page.locator('tbody')).toContainText('No data found');
        }
        else {
            await expect(page.locator('tbody').first().locator('td').last()).toHaveText(age);
            const allTableRows = await page.locator('tbody tr').all();
            for (const tableRow of allTableRows) {
                await expect(tableRow.locator('td').last()).toHaveText(age);
            }
        }
    }
});

//using hardcoded values
test('Date Picker 1', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click();

    
    await page.locator('.day-cell:not(.bounding-month)').getByText('2', {exact: true}).click();
    await expect(calendarInputField).toHaveValue('Aug 2, 2026');
    await calendarInputField.click();
    await page.locator('.bounding-month').getByText('30').click();
    await expect(calendarInputField).toHaveValue('Jul 30, 2026');
    await calendarInputField.click();
    await page.locator('.bounding-month').getByText('1', {exact: true}).click();
    await expect(calendarInputField).toHaveValue('Aug 1, 2026');
});

//using dynamic values
test('Date Picker 2', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click();
   
    const date = new Date();
    date.setDate(date.getDate() + 100);
    const expectedDay = date.getDate().toString();
    const expectedMonth = date.toLocaleString('En-US', { month: 'short' });
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
    const expectedYear = date.getFullYear();
    const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`;

    let currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
    while (!currentMonthAndYear?.includes(expectedMonthAndYear)) {
        await page.locator('.next-month').click();
        currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent(); 
    }

    await page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, {exact: true}).click();
    await expect(calendarInputField).toHaveValue(expectedDate);
});

test('Sliders', async ({ page }) => {
    //1- setting the attribute values
    //const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    //await tempGauge.evaluate(element => {
    //    element.setAttribute('cx', '232.630');
    //    element.setAttribute('cy', '232.630');
    //})
    //await tempGauge.click();

    //2- dragging the slider
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded();
    const boundingBox = await tempBox.boundingBox();
    if (boundingBox) {
        const x = boundingBox?.x + boundingBox?.width / 2;
        const y = boundingBox?.y + boundingBox?.height / 2;
        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x + 100, y);
        await page.mouse.move(x + 100, y + 100);
        await page.mouse.up();
    }
    await expect(tempBox).toContainText('30');
});

test('iFrames', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Dialog').click();

    const iframe = page.frameLocator('[data-cy="esc-close-iframe"]');
    await iframe.getByRole('button', {name: "Open Dialog with esc close"}).click();
});

test('Drag & Drop', async ({ page }) => {
    await page.getByText('Extra Components').click();
    await page.getByText('Drag & Drop').click();

    // Option #1 - using the dragTo() method
    await page.getByText('Clean my room').dragTo(page.locator('#drop-list'));

    //Option #2 - using mouse events
    await page.getByText('Get Groceries').hover();
    await page.mouse.down();
    await page.locator('#drop-list').hover();
    await page.mouse.up();
});