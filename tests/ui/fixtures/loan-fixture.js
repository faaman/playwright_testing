import { test as base } from '@playwright/test';
import LoanPage from '../pages/loan-page.js';
import hooks from '../../utils/hooks.js';

export const test = base.extend({
  loanPage: async ({ page }, use) => {
    // Initialize loan page with hooks
    const loanPage = await hooks.beforeEach(page, LoanPage, 'loan');
    
    // Make available to tests
    await use(loanPage);
    
    // Optional: Add teardown logic here if needed
  },
});

export { expect } from '@playwright/test';