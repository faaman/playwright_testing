import messages from '../../utils/messages.js';

export default class LoanPage {
    constructor(page) {
      this.page = page;
      this.loanAmountInput = page.locator('#amount');
      this.downPaymentInput = page.locator('#downPayment');
      this.fromAccountSelect = page.locator('#fromAccountId');
      this.loanButton = page.locator('input[value="Apply Now"]');
      this.outcomeHeader = page.locator('h1.title:has-text("Loan Request Processed")');
      this.loanStatus = page.locator('#loanStatus');
      this.successMessage = page.getByText(messages.loan.valid);
      this.failureMessage = page.getByText(messages.loan.invalid);
      this.successMessageDate = page.locator('#responseDate');
    }
  
    async loanRequest(loanAmountInput, downPaymentInput, fromAccountSelect) {
        //Fill loan form
      await this.loanAmountInput.fill(loanAmountInput);
      await this.downPaymentInput.fill(downPaymentInput);
      await this.fromAccountSelect.selectOption({ value: fromAccountSelect });
      // Submit loan
      await this.loanButton.click();
    }

    async isRequestProcessed() {
      await this.outcomeHeader.waitFor();
      return this.outcomeHeader.isVisible();
    }
  }