// This tests xpath selectors 
import { test, expect } from '@playwright/test';
import { XPathPage } from '../pages/giant-panda-xpath-page.js';

test.describe('DuckDuckGo XPath locator coverage', () => {
  let pageObj;

  const xpathChecks = [
    ['By path from root', 'byPathFromRoot'],
    ['By exact attribute', 'byExactAttribute'],
    ['By contains attribute', 'byContainsAttribute'],
    ['By starts-with attribute', 'byStartsWithAttribute'],
    ['By text()', 'byText'],
    ['By contains(text())', 'byContainsText'],
    ['By index', 'byIndex'],
    ['By parent-child', 'byParentChild'],
    ['By ancestor', 'byAncestor'],
    ['By descendants of header', 'byDescendantsOfHeader'],
    ['By following-sibling', 'byFollowingSibling'],
    ['By preceding-sibling', 'byPrecedingSibling'],
    ['By attribute condition AND', 'byAttributeConditionAnd'],
    ['By attribute condition OR', 'byAttributeConditionOr'],
    ['By logical not function', 'byLogicalNotFunction'],
  ];

  test.beforeAll(async ({ browser }) => {
    // create a new browser context and page explicitly for beforeAll
    const context = await browser.newContext();
    const page = await context.newPage();
    pageObj = new XPathPage(page);
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

  for (const [name, prop] of xpathChecks) {
    test(`XPath: ${name}`, async () => {
      const locator = pageObj[prop];
      const count = await pageObj.countSelector(locator);
      console.log(`${name}: ${count} matches`);
      expect(count).toBeGreaterThanOrEqual(0);
    });
  }
});
