import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page.js';
import messages from '../../utils/messages.js';

let profilePage;

const BASE_URL = 'https://parabank.parasoft.com/parabank';

test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/pages.profile`);
    profilePage = new ProfilePage(page);
});

test.describe('Profile - Stored Auth', () => {
    test('Check logged in', async () => {
        await profilePage.checkLoggedIn(messages.login.user_one);
    });
});