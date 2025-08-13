// This is the page object for testing xpath selectors 

export class XPathPage {
  constructor(page) {
    this.page = page;

    // DuckDuckGo search elements
    this.searchInput = page.locator('#search_form_input, input[name="q"]');
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.results = page.locator('a.result__a');

    // XPath locators based on common strategies

    // By path from root
    this.byPathFromRoot = page.locator('xpath=//html/body');
    
    // By exact attribute
    this.byExactAttribute = page.locator('//*[@id="search_form_input"]');

    // By contains attribute
    this.byContainsAttribute = page.locator('//*[contains(@id,"search_form")]');

    // By starts-with attribute
    this.byStartsWithAttribute = page.locator('//*[starts-with(@id,"search_form")]');

    // By text()
    this.byText = page.locator('//a[text()="Images"]');

    // By contains(text()) - this works
    this.byContainsText = page.locator('//a[contains(text(),"Images")]');

    // By index (nth occurrence)
    this.byIndex = page.locator('(//a[contains(@class,"result__a")])[1]');

    // By parent-child
    this.byParentChild = page.locator('//div[contains(@class,"site-wrapper")]/div[contains(@class,"welcome-wrap")]');

    // By ancestor
    this.byAncestor = page.locator('//div[contains(@class,"header")]/ancestor::div[contains(@class,"site-wrapper")]');

    // Select all descendants of the header
    this.byDescendantsOfHeader = page.locator('//div[contains(@class,"header")]//descendant::*');

    // By following-sibling
    this.byFollowingSibling = page.locator('//ul[@class="XvPRmQVeIoCP5lQhICTv DrcNDXeWs90rE8UOUh96"]/li[a[text()="News"]]/following-sibling::li');

    // By preceding-sibling
    this.byPrecedingSibling = page.locator('//ul[@class="XvPRmQVeIoCP5lQhICTv DrcNDXeWs90rE8UOUh96"]/li[a[text()="News"]]/preceding-sibling::li');

    // By attribute condition AND, OR, and NOT
    this.byAttributeConditionAnd = page.locator('//img[@height="16" and @width="16"]');

    this.byAttributeConditionOr = page.locator('//input[@name="q" or @id="search_form_input"]');

    this.byLogicalNotFunction = page.locator('//a[not(contains(@class, "header"))]');

    // This selects elements by an attribute
    this.byAttribute2 = page.locator('//div[@data-result="snippet"]');

    // When the only way to select an element that has the previous attribute and also a particular text, is by its text content - fragile locator
    this.byTextFilter = page.locator('//div[@data-result="snippet" and contains(., "bamboo")]')

    // a NOT condition for previous text filter
    this.byNotTextFilter = page.locator('//div[@data-result="snippet" and not(contains(., "bamboo"))]')

    // This selects elements by an index - fragile locator
    this.byIndex2 = page.locator('(//div[@data-result="snippet"])[3]');

    // Finding elements relative to other elements using advanced relationships
    this.byLinkImg = page.locator('//a[.//img]');
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
