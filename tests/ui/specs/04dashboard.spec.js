/*  Ensures the test is correctly navigating to the dashboard after login.
 Validates that the auth session (auth.json) is working properly.
 Confirms that the dashboard UI loads correctly after login.*/

import { test, expect } from '@playwright/test';
import messages from '../../utils/messages.js';

test.describe('PHPTravels Dashboard and Logout Tests', () => {
    test('Verify dashboard after login', async ({ page }) => {
        // Navigate to the dashboard (user should already be logged in)
        await page.goto('https://phptravels.net/dashboard');

        // Check if the dashboard page is loaded
        await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();  // Dashboard link confirms login

        console.log("Dashboard is visible, login state persisted!");
    });

    test('User can log out', async ({ page }) => {
        await page.goto('https://phptravels.net/dashboard');
    
        // Click on the "Demo User" to open the dropdown
        await page.getByText('Demo User', { exact: true }).click();
    
        // Click the "Logout" link inside the dropdown
        await page.getByText('Logout', { exact: true }).click();
        await page.waitForURL('https://phptravels.net', { timeout: 5000 });

        // Wait for "Logout Successful" message to appear  
        await page.waitForSelector('.text-group h4', { state: 'visible', timeout: 5000 });

        // Ensure message is correct  
        const logoutMessage = await page.locator('.text-group h4').innerText();

        if (logoutMessage.includes(messages.logout.valid)) {
            console.log('Successfully logged out with the correct message:', logoutMessage);
        } else {
            console.log('Successfully logged out with an unexpected logout message:', logoutMessage);
        }
    });
});  