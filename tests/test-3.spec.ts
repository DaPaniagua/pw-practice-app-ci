import { expect } from '@playwright/test';
import { test } from '../test-options';

test('test', async ({ page, globalsQaURL }) => {
  await page.goto(globalsQaURL);
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Form Layouts' }).click();
  await page.getByRole('textbox', { name: 'Jane Doe' }).fill('Danny Paniagua');
  await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByPlaceholder('Email').fill('dpaniagua@test.com');
  await page.locator('.custom-checkbox').first().click();
  await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByRole('button').click();
});