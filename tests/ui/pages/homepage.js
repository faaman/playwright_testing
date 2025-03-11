import { expect } from '@playwright/test';

export class HomePage {
        //variables
        /**This line here is a JSDoc type annotation - @type {Page} */
        page;
        footerLink;

        //constructor
        constructor(page) {
            this.page = page;
            this.footerLink = page.locator('footer a', { hasText: 'Made by Polymer' });
        }
    
        //methods
        async verifyTitle() {
            await expect(this.page).toHaveTitle(/Home - SHOP/);
        }
        async findFooterAttribute() {
            await expect(this.footerLink).toHaveAttribute('href', 'https://www.polymer-project.org/3.0/toolbox/');
        }
}

export default HomePage;
