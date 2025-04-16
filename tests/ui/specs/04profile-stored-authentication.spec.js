import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page.js';
import pages from '../../utils/pages.js';
import messages from '../../utils/messages.js';

let profilePage;

test.beforeEach(async ({ page }) => {
    await page.goto(pages.profile);
    profilePage = new ProfilePage(page);
});

test.describe('Profile - Stored Auth', () => {
    test('Check logged in', async () => {
        await profilePage.checkLoggedIn(messages.login.user_one);
    });
});