import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/delete-loginPage-qapractice.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
