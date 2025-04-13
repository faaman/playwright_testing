import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.use({ storageState: { cookies: [], origins: [] } // doesn't share the logged in session
  //storageState: null,  // https://github.com/microsoft/playwright/issues/17396
});

test.describe('Para Bank Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    // Initialize LoginPage with the new page instance
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Successful Login', async () => {
    await loginPage.login('john', 'demo');
    await loginPage.assertSuccessfulLogin();
  });

  test('Failed Login with Incorrect Password', async () => {
    await loginPage.login('john', 'wrongpassword');
    await loginPage.assertFailedLogin();
  });

  test('Failed Login with Invalid Email', async () => {
    await loginPage.login('wronguser', 'demo');
    await loginPage.assertFailedLogin();
  });
});