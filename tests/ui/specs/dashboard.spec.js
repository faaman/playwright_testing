/*  Ensures the test is correctly navigating to the dashboard after login.
 Validates that the auth session (auth.json) is working properly.
 Confirms that the dashboard UI loads correctly after login.*/

const { test, expect } = require('@playwright/test');

test('Verify dashboard after login', async ({ page }) => {
    // Navigate to the dashboard (user should already be logged in)
    await page.goto('https://phptravels.net/dashboard');

    // Check if the dashboard page is loaded
    await expect(page.locator('role=link[name="Dashboard"]')).toBeVisible();  // Dashboard link confirms login

    console.log("Dashboard is visible, login state persisted!");
});