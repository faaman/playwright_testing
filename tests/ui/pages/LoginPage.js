import { expect } from '@playwright/test';
import messages from '../../utils/messages.js';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.errorMessage = page.locator('.error'); 
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.html');
  }

  async login(email, password) {
    await this.usernameField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async assertSuccessfulLogin() {
    await expect(this.page).toHaveURL("https://parabank.parasoft.com/parabank/overview.htm");
    await expect(this.page.locator('text="Welcome"')).toBeVisible();
  }

  async assertFailedLogin() {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      // Take screenshot
      await this.page.screenshot({ 
        path: 'pass-screenshots/wrong_login_error_message.png',
        fullPage: true 
      });
    
      // Verify text
      const actualError = await this.errorMessage.innerText();
      if (actualError.includes(messages.login.invalid)) {
        console.log('Correct error message:', actualError);
      } else {
        throw new Error(`Wrong error message. Expected "${messages.login.invalid}", got "${actualError}"`);
      }
  }
}

export default LoginPage;