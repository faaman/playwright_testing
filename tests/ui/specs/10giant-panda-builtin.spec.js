// This tests builtin selectors 
import { test, expect } from '@playwright/test';
import { BuiltinPage } from '../pages/giant-panda-builtin-page.js';

test.describe('Search and use Playwright builtin locators', () => {
  let pageObj;

  const builtinChecks = [
    ['Get by role - heading', 'roleHeading'],
    ['Get by role - link', 'roleLink'],
    ['Get by label - positive feedback', 'labelPositive'],
    ['Get by placeholder', 'placeholder'],
    ['Get by text', 'textOfElement'],
    ['Get by alt text', 'altText'],
    ['Get by title', 'title'],
    ['Get by test id', 'testId'], 
  ];

  test.beforeAll(async ({ browser }) => {
    // create a new browser context and page explicitly for beforeAll
    const context = await browser.newContext();
    const page = await context.newPage();
    pageObj = new BuiltinPage(page);
    await pageObj.navigateDuckDuckGo();
    await pageObj.searchFor('giant panda');
  });

  test.afterAll(async () => {
    await pageObj.page.context().close(); // clean up context after tests
  });

  test('should find at least one DuckDuckGo result', async () => {
    const count = await pageObj.countResults();
    console.log('DuckDuckGo result count:', count);
    expect(count).toBeGreaterThan(0);
  });

  for (const [name, prop] of builtinChecks) {
    test(`should not error when using CSS selector: ${name}`, async () => {
      const locator = pageObj[prop];
      const count = await pageObj.countSelector(locator);
      console.log(`${name} selector count:`, count);
      // Assert it doesn't crash and returns a number ≥ 0
      expect(count).toBeGreaterThanOrEqual(0);
    });
  }
});
