import { test, chromium } from '@playwright/test';

test('Login as Admin, User, and Supplier', async () => {
    const browser = await chromium.launch({ headless: false });

    // Backoffice Super Admin Login
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    await adminPage.goto('https://phptravels.net/admin');
    await adminPage.fill('input[name=email]', 'admin@phptravels.com');
    await adminPage.fill('input[name=password]', 'demoadmin');
    await adminPage.click('button[type=submit]');
    await adminPage.waitForLoadState('networkidle');
    await adminContext.storageState({ path: 'auth/admin.json' });

    // User Login
    const userContext = await browser.newContext();
    const userPage = await userContext.newPage();
    await userPage.goto('https://phptravels.net/login');
    await userPage.fill('input[name=email]', 'user@phptravels.com');
    await userPage.fill('input[name=password]', 'demouser');
    await userPage.click('button[type=submit]');
    await userPage.waitForLoadState('networkidle');
    await userContext.storageState({ path: 'auth/user.json' });

    // Supplier Login
    const supplierContext = await browser.newContext();
    const supplierPage = await supplierContext.newPage();
    await supplierPage.goto('https://phptravels.net/supplier');
    await supplierPage.fill('input[name=email]', 'supplier@phptravels.com');
    await supplierPage.fill('input[name=password]', 'demosupplier');
    await supplierPage.click('button[type=submit]');
    await supplierPage.waitForLoadState('networkidle');
    await supplierContext.storageState({ path: 'auth/supplier.json' });

    console.log('Authentication states saved for Admin, User, and Supplier.');

    await browser.close();
});