// login.spec.mjs
import { test, expect } from '../fixtures/fixtures.js';

test('Successful login', async ({ loginPage }) => {
  await loginPage.login('admin@admin.com', 'admin123');
  await expect(loginPage.page.locator('#welcomeMessage')).toHaveText('Welcome validUser');
});

test('Unsuccessful login with invalid credentials', async ({ loginPage }) => {
  await loginPage.login('invalidUser', 'invalidPassword');
  await loginPage.getByRole('alert').waitFor(); // Waits for alert to appear
  await expect(loginPage.getByRole('alert')).toHaveText('Bad credentials! Please try again!');
});
