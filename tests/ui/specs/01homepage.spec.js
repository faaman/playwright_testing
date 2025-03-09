import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';

const POLYMER_URL = 'https://shop.polymer-project.org';

let homePage;

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);

    // All Tests - Step 1: Open the home page
    await page.goto(POLYMER_URL);
    homePage = new HomePage(page)
    // open a URL
    // clean up the DB
    // create a page object
    // dismiss a modal
    // load params
});

test.afterAll(async () => {
    console.log('Test file -homepage- completed.');
    // close a DB connection
});

test.afterEach( async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus)
        console.log(`Did not run as expected, ended up at ${page.url()}`);
    // clean up all the data we created for this test through API calls
});

// Test 1: Verify Home Page Loads Correctly

test.describe('Test 1: Verify Home Page Loads Correctly', () => {
  // used @smoke tag to run only smoke tests
  test('@smoke - has title', async ({ page }) => {

    // Test 1 - Step 2: Verify the page title is correct
    await expect(page).toHaveTitle(/Home - SHOP/);

    // Check that the footer exists with the correct text and href, doing this with the help of POM and constructors 
    await homePage.findFooterAttribute();

  });

  test('get started link', async ({ page }) => {

    // Click the 'Men's Outerwear Shop Now' link.
    await page.getByRole('link', { name: "Men's Outerwear Shop Now" }).click();

    // Expects next page to have a text with the 'items' word in it.
    const spanLocator = page.locator('span', { hasText: 'items' });
    await expect(spanLocator).toBeVisible();
  });
});