import { buildUrl } from './uiUrlBuilder.js';
import pages from './pages.js';

const BASE_URL = 'https://parabank.parasoft.com/parabank';

export default {
    beforeEach: async function(page, PageObjectParam, pageKey, params = {}) {
        const relativeUrl = buildUrl(pageKey, params, pages);
        await page.goto(`${BASE_URL}${relativeUrl}`);
        return new PageObjectParam(page);
    }
};