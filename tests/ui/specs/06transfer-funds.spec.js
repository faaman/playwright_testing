import { test, expect } from '../fixtures/transfer-fixture.js';

test.describe('Funds Transfer Tests', () => {
  let fromAccountId = '13344'; 
  let toAccountId = '13344';   
  const transferAmount = '100.00';

  test('Successful funds transfer between accounts', async ({ transferPage }) => {

    // Perform transfer using page object
    await transferPage.transferFunds(fromAccountId, toAccountId, transferAmount);
    
    // Verify success
    await expect(transferPage.successMessage).toBeVisible();
    await expect(transferPage.page.getByText(`$${transferAmount} has been transferred`)).toBeVisible();

  });

});