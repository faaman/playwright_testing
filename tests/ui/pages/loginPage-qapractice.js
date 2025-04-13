export class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.getByRole('textbox', { name: 'email' });
      this.passwordInput = page.getByRole('textbox', { name: 'password' });
      this.loginButton = page.locator("#submitLoginBtn");
    }
  
    async navigate() {
      await this.page.goto('https://qa-practice.netlify.app/auth_ecommerce.html');
    }
  
    async login(username, password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }
}  