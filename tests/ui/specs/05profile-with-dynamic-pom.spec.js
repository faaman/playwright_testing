import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page.js';
import hooks from '../../utils/hooks.js';
import messages from '../../utils/messages.js';

let profilePage;

test.beforeEach(async ({ page }) => {
    profilePage = await hooks.beforeEach(page, ProfilePage, 'profile');
});

test.describe('Profile - Dynamic Page Object Model', () => {
    test('Check logged in', async () => {
        await profilePage.checkLoggedIn(messages.login.user_one);
    });
});