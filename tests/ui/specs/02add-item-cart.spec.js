import { test, expect } from '@playwright/test';

const POLYMER_URL = 'https://shop.polymer-project.org';

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    // open a URL
    // clean up the DB
    // create a page object
    // dismiss a modal
    // load params
});

test.afterAll(async () => {
    console.log('Test file -add-item-to-cart- completed.');
    // close a DB connection
});

test.afterEach( async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus)
        console.log(`Did not run as expected, ended up at ${page.url()}`);
    // clean up all the data we created for this test through API calls
});

//Test 2: Add Item to Cart
test('add item to cart', async ({ page }) => {
    await page.goto(POLYMER_URL);

    //Test 2 - Step 1: Navigate to the "Ladies Outerwear" page and select the first item.
    await page.getByRole('link', { name: "Ladies Outerwear Shop Now"}).click();
    const spanLocator = page.locator('span', { hasText: 'items' });
    await expect(spanLocator).toBeVisible();

    const firstProductLink = page.locator('ul.grid li a').first();
    
    const productImage = firstProductLink.locator('img');
    const altText = await productImage.getAttribute('alt');
    console.log(`ALT text: ${altText}`);

    await firstProductLink.click();

    // Check that there is a heading in this page that matches the alt text of the clicked image in previous page
    const matchingH1 = page.locator('h1', { hasText: altText });
    await expect(matchingH1).toBeVisible({ timeout: 5000 });
    
    const h1Text = await matchingH1.textContent();
    console.log(`✅ Matching h1 text: "${h1Text.trim()}"`);

    //Test 2 - Step 2: Click on the "Add to Cart" button for the first item.
    await page.getByRole('button', { name: 'Add this item to cart' }).click();
    // Assert that the "Added to cart" label is visible
    await expect(page.locator('div.label', { hasText: 'Added to cart' })).toBeVisible({ timeout: 5000 });
    await page.getByRole('link', { name: 'View Cart' }).click();

    //Test 2 - Step 3: Verify that the cart icon updates to reflect the added item.
    await expect(page.locator('h1', { hasText: 'Your Cart' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('link', { name: 'Ladies Modern Stretch Full Zip' }).nth(1)).toBeVisible();
    await page.screenshot({ path: 'pass-screenshots/after-add-to-cart.png', fullPage: true });
});