import { expect } from '@playwright/test';

class ParaBankPage {
  constructor(page) {
    this.page = page;
    // ParaBank-specific locators
    this.accountOverviewHeader = page.getByRole('heading', { name: 'Accounts Overview' });
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
    this.welcomeMessage = page.locator('#leftPanel p.smallText');
    this.accountTableRows = page.locator('#accountTable tr');
    this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
  }

  async checkLoggedIn(username) {
    await expect(this.welcomeMessage).toContainText(`Welcome ${username}`);
    await expect(this.logoutLink).toBeVisible();
  }

  async checkAccountOverview() {
    await expect(this.accountOverviewHeader).toBeVisible();
    await expect(this.accountTableRows).toHaveCount(3); // 1 header + 2 accounts (default in ParaBank)
  }

  async navigateToTransferFunds() {
    await this.transferFundsLink.click();
  }
}

export default ParaBankPage;