// This is the page object for testing Playwright builtin locators

export class BuiltinPage {
  constructor(page) {
    this.page = page;

    // DuckDuckGo search elements
    this.searchInput = page.locator('#search_form_input, input[name="q"]');
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.results = page.locator('a.result__a');

    // Builtin locators
    this.roleHeading = page.getByRole('heading', { name: 'Giant panda' });
    this.roleLink = page.getByRole('link', { name: 'Images' });
    this.labelPositive = page.getByLabel('Positive feedback');
    this.placeholder = page.getByPlaceholder('Search privately');
    this.textOfElement = page.getByText('More', { exact: true });
    this.altText = page.getByAltText('Giant panda - Wikipedia');
    this.title = page.getByTitle('Search domain');
    this.testId = page.getByTestId('header-logo');
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