import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.use({ storageState: { cookies: [], origins: [] } // doesn't share the logged in session
  //storageState: null,  // https://github.com/microsoft/playwright/issues/17396
});

test.describe('PHPTravels Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    // Initialize LoginPage with the new page instance
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Successful Login', async () => {
    await loginPage.login('user@phptravels.com', 'demouser');
    await loginPage.assertSuccessfulLogin();
  });

  test('Failed Login with Incorrect Password', async () => {
    await loginPage.login('user@phptravels.com', 'wrongpassword');
    await loginPage.assertFailedLogin();
  });

  test('Failed Login with Invalid Email', async () => {
    await loginPage.login('wrong@phptravels.com', 'demouser');
    await loginPage.assertFailedLogin();
  });
});