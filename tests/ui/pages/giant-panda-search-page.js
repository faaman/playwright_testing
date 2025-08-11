//import { expect } from '@playwright/test';

export class ExamplePage {
  constructor(page) {
    this.page = page;

    // DuckDuckGo search elements
    this.searchInput = page.locator('#search_form_input, input[name="q"]');
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.results = page.locator('a.result__a');

    // CSS selectors
    // most basic type of CSS Selector is tag name (e.g. “body” or “div”), that's a valid CSS Selector, not a very useful one.
    this.tagName = page.locator('div');
    // attach a class name
    this.tagClass = page.locator('div.header');   
    // get more header-starting classes
    this.tagClassMore = page.locator('div[class^="header"]');  
    // by ID of an element
    this.id = page.locator('#search_form_input');
    // chain together ancestor-descendant relationships or parent-child relationships of elements (e.g. looking for a welcome-wrap class inside a site-wrapper class)
    this.descendant = page.locator('div.site-wrapper div.welcome-wrap');
    // this is a third level descendant
    this.descendantThird = page.locator('div.site-wrapper div.header');
    // this is not a direct child of an element, so gives 0 results
    this.directChildNo = page.locator('div.site-wrapper > div.header');
    // this is a direct child of an element, so gives a result
    this.directChildYes = page.locator('div.site-wrapper > div.welcome-wrap');
    this.multiple = page.locator('ol, ul');
    this.attrExistence = page.locator('[style]');
    this.attrTag = page.locator('div[style]');
    this.attrContains = page.locator("div[class*='results']");
    // also works:    this.attrEquals = page.locator('a.kFFXe30DOpq5j1hbWU1q.wZ4JdaHxSAhGy1HoNVja.d26Geqs1C__RaCO7MUs2').filter({ hasText: 'Images' })
    this.attrEquals = page.locator('a.kFFXe30DOpq5j1hbWU1q', { hasText: 'Images' });
    this.negation = page.locator('ul.XvPRmQVeIoCP5lQhICTv.DrcNDXeWs90rE8UOUh96 > li:not(:nth-child(1)) > a');
    this.nthChild = page.locator('ul.XvPRmQVeIoCP5lQhICTv.DrcNDXeWs90rE8UOUh96 > li > a').nth(1);
  }

  async navigateDuckDuckGo() {
    await this.page.goto('https://duckduckgo.com');
  }

  async searchFor(query) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.results.first().waitFor({ state: 'visible', timeout: 30000 });
  }

  async countResults() {
    return this.results.count();
  }

  // Helper to count any selector
  async countSelector(locator) {
    return locator.count();
  }
}
