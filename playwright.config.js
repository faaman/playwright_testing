// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  testIgnore: [
    'tests/example.spec.js', 
  ],
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Reporter to use. This below can generate a JSON file with test results:
  reporter: [
    ['json', { outputFile: 'test-results.json' }] // Saves results as JSON
  ],*/
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // the below line is used to run the global setup file for authentication testing of phptravels website: 
  globalSetup: './tests/setup/global-setup.js',
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'https://shop.polymer-project.org',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',  // Captures a screenshot only if the test fails
    //video: 'on', // Record video for every test
    //headless: false, // Optional: Run in non-headless mode for debugging
    //slowMo: 50, // Optional: Slow down actions for better UI debugging
    // the below 2 lines are used to run the global setup file for authentication testing of phptravels website: 
    storageState: 'auth.json',  // Use the saved login session
    //headless: false,            // Set to true for faster test execution
    timeout: 30000,  // 30 seconds
    navigationTimeout: 20000  // Page load timeout
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'api',
      testMatch: '**/api/specs/*.spec.js',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com'
      }
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

   /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'all-browsers-and-tests',
      use: { 
        baseURL: 'https://shop.polymer-project.org',
         ...devices['Desktop Chrome']
      },
    },

    {
      name: 'all-browsers-and-tests',
      use: { 
        baseURL: 'https://shop.polymer-project.org',
         ...devices['Desktop Safari']
      },
    },

    {
      name: 'all-browsers-and-tests',
      use: { 
        baseURL: 'https://shop.polymer-project.org',
         ...devices['Desktop Firefox']
      },
    },*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

