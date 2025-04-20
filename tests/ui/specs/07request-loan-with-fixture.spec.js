import { test, expect } from '../fixtures/loan-fixture.js';
import { format } from 'date-fns';
// install if not present: npm install date-fns
import messages from '../../utils/messages.js';

test.describe('Request Loan Tests', () => {
  let loanAmount = '100.00'; //for failure use '1000.00';
  let downPayment = '10.00'; //for failure use '100.00';
  let fromAccountId = '13344'; //these can keep changing, so need to add a logic to check which id is available plus also check amount in the account

  test('Successful funds transfer between accounts', async ({ loanPage }) => {

    // Request loan using page object
    await loanPage.loanRequest(loanAmount, downPayment, fromAccountId);
    expect(await loanPage.isRequestProcessed()).toBeTruthy();
    
    //Verify outcome
    const statusText = await loanPage.loanStatus.innerText();
    console.log(`Loan Status: ${statusText}`);
    if (statusText === 'Approved') {
      await expect(loanPage.successMessage).toBeVisible();
      await expect(loanPage.successMessage).toHaveText(messages.loan.valid);
      const today = format(new Date(), 'MM-dd-yyyy'); 
      await expect(loanPage.successMessageDate).toHaveText(today);
    } else if (statusText === 'Denied') {
        await expect(loanPage.failureMessage).toBeVisible();
        await expect(loanPage.failureMessage).toHaveText(messages.loan.invalid);
    } else {
        throw new Error(`Unexpected loan status: ${statusText}`);
    }

  });

});