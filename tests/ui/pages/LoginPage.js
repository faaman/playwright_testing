import { expect } from '@playwright/test';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('#email');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('button:has-text("Login")');
    this.errorMessage = page.locator('.alert-danger'); // Adjust selector if needed
  }

  async goto() {
    await this.page.goto('https://phptravels.net/login');
  }

  async login(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async assertSuccessfulLogin() {
    await expect(this.page).toHaveURL("https://phptravels.net/dashboard");
    await expect(this.page.locator('span:text("Demo User")')).toBeVisible();
  }

  async assertFailedLogin() {
    await this.page.waitForSelector('.text-group h4', { state: 'visible', timeout: 3000 });
    await this.page.screenshot({ path: 'pass-screenshots/wrong_login_error_message.png' });
    const errorText = await this.page.locator('.text-group h4').innerText();
    console.log('Error:', errorText);
  }
}

export default LoginPage;