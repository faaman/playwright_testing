import { test as base } from '@playwright/test';
import TransferPage from '../pages/transfer-page.js';
import hooks from '../../utils/hooks.js';

export const test = base.extend({
  transferPage: async ({ page }, use) => {
    // Initialize transfer page with hooks
    const transferPage = await hooks.beforeEach(page, TransferPage, 'transfer');
    
    // Make available to tests
    await use(transferPage);
    
    // Optional: Add teardown logic here if needed
  },
});

export { expect } from '@playwright/test';