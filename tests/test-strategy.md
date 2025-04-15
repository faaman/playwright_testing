# Test Strategy for Playwright Automation of multiple test websites

## Objective
The goal of this test suite is to automate key user journeys using Playwright for functional, UI, API, and regression testing.

## Test Types
1. **Smoke Tests** – Verify basic app functionality (e.g., login, navigation).
2. **Regression Tests** – Ensure no breaking changes after updates.
3. **E2E Tests** – Simulate real user flows (e.g., checkout, profile update).

## Execution Strategy
- **Run locally before merging** (`npx playwright test`).
- **CI/CD integration** (e.g., GitHub Actions, Jenkins).
- **Video recording & screenshots for debugging**.

## Test Coverage
- **Authentication** (login, logout, error handling).
- **UI Elements** (buttons, modals, alerts).
- **API Calls** (mocking, validation).

## Test Websites used
- **Basic UI tests** using Polymer website.
- **Authentication** using Para Bank website.
