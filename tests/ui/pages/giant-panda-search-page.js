//import { expect } from '@playwright/test';

export class ExamplePage {
  constructor(page) {
    this.page = page;

    // DuckDuckGo search elements
    this.searchInput = page.locator('#search_form_input, input[name="q"]');
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.results = page.locator('a.result__a');

    // CSS selectors from TAU Chapter 4
    this.tag = page.locator('div');
    this.className = page.locator('.result');
    this.tagAndClass = page.locator('div.result');
    this.id = page.locator('#search_form_input');
    this.descendant = page.locator('div.cw div.result');
    this.directChild = page.locator('li.zcm__item > a');
    this.multiple = page.locator('ol, ul');
    this.attrExistence = page.locator('[style]');
    this.attrTag = page.locator('div[style]');
    this.attrEquals = page.locator("a[data-zci-link='images']");
    this.attrContains = page.locator("div[class*='results']");
    this.negation = page.locator('div.result:not(.result--more)');
    this.nthChild = page.locator('div.result:nth-child(5)');    
  }

  async navigateDuckDuckGo() {
    await this.page.goto('https://duckduckgo.com');
  }

  async searchFor(query) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector('a.result__a', { state: 'visible', timeout: 30000 });
  }

  async countResults() {
    return this.results.count();
  }

  // Helper to count any selector
  async countSelector(locator) {
    return locator.count();
  }
}
