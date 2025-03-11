/* Ensures login was successful before saving the session to auth.json.
 Prevents saving an invalid session (e.g., if login fails).
 Guarantees that all tests using auth.json start from a logged-in state.*/

import { chromium } from '@playwright/test';

export default async function globalSetup() {
    const browser = await chromium.launch({ headless: false });  // Set to true for faster execution - ask if this is needed?? 
    const page = await browser.newPage();

    // Navigate to the PHPTravels login page
    await page.goto('https://phptravels.net/login');

    // Fill in login credentials
    await page.fill('input[name="email"]', 'user@phptravels.com');  // Replace with valid email
    await page.fill('input[name="password"]', 'demouser');          // Replace with valid password

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for a key element that confirms successful login
    await page.waitForSelector('span.ms-0', { timeout: 5000 });

    // Save authentication state
    await page.context().storageState({ path: 'auth.json' });

    // Close the browser
    await browser.close();
};