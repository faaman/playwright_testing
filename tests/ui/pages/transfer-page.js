export default class TransferPage {
    constructor(page) {
      this.page = page;
      this.fromAccountSelect = page.locator('#fromAccountId');
      this.toAccountSelect = page.locator('#toAccountId');
      this.amountInput = page.locator('#amount');
      this.transferButton = page.locator('input[value="Transfer"]');
      this.successMessage = page.getByText('Transfer Complete!');
    }
  
    async transferFunds(fromAccount, toAccount, amount) {
        //Fill transfer form
      await this.fromAccountSelect.selectOption({ value: fromAccount });
      await this.toAccountSelect.selectOption({ value: toAccount });
      await this.amountInput.fill(amount);
      // Submit transfer
      await this.transferButton.click();
    }
  }