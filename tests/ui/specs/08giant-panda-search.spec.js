// This tests CSS selectors 
import { test, expect } from '@playwright/test';
import { CSSPage } from '../pages/giant-panda-search-page.js';

test.describe('DuckDuckGo Search + CSS Selector Coverage', () => {
  let pageObj;

  const cssChecks = [
    ['Tag name', 'tagName'],
    ['Tag class', 'tagClass'],
    ['Tag class starting with header', 'tagClassMore'],
    ['ID', 'id'],
    ['Descendant combinator', 'descendant'],
    ['Descendant combinator - third level', 'descendantThird'],
    ['Direct child combinator no', 'directChildNo'],
    ['Direct child combinator yes', 'directChildYes'],
    ['Multiple selectors', 'multiple'],
    ['Attribute existence', 'attrExistence'],
    ['Tag with attribute', 'attrTag'],
    ['Attribute contains', 'attrContains'],
    ['Attribute equality', 'attrEquals'],
    ['Negation pseudoclass', 'negation'],
    ['Nth-child pseudoclass', 'nthChild'],
  ];

  test.beforeAll(async ({ browser }) => {
    // create a new browser context and page explicitly for beforeAll
    const context = await browser.newContext();
    const page = await context.newPage();
    pageObj = new CSSPage(page);
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

  for (const [name, prop] of cssChecks) {
    test(`should not error when using CSS selector: ${name}`, async () => {
      const locator = pageObj[prop];
      const count = await pageObj.countSelector(locator);
      console.log(`${name} selector count:`, count);
      // Assert it doesn't crash and returns a number ≥ 0
      expect(count).toBeGreaterThanOrEqual(0);
    });
  }
});
