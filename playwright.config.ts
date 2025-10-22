import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'node:path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const testDir = defineBddConfig({
  features: 'tests/features/**/*.feature',
  steps: 'tests/steps/**/*.ts',
  importTestFrom: "fixtures/pageFixtures.ts", // ✅ ADD THIS LINE
  disableWarnings: { importTestFrom: true }, // optional temporary workaround
});


export default defineConfig({
  testDir,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["allure-playwright"], ["line"], ["list"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  /* Global timeouts and browser behavior */
  timeout: 60000, // ✅ Max timeout for each test (60s)
  expect: {
    timeout: 10000, // ✅ Default timeout for expect() (10s)
  },
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL || "https://testerbud.com/",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    /* Headed for debugging */
    headless: process.env.HEADLESS ? process.env.HEADLESS === 'true' : false,
    actionTimeout: 10000, // ✅ timeout for actions like click(), fill()
    navigationTimeout: 15000, // ✅ timeout for navigations
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // 🥇 Google Chrome (Most Popular)
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome', // ✅ use installed Chrome
        locale: 'en-US',
        launchOptions: {
          args: ['--lang=en-US'],
        },
      },
    },

    // 🥈 Apple Safari (WebKit)
    {
      name: 'Apple Safari',
      use: {
        ...devices['Desktop Safari'],
        locale: 'en-US',
      },
    },

    // 🥉 Microsoft Edge (Chromium-based)
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        locale: 'en-US',
        launchOptions: {
          args: ['--lang=en-US'],
        },
      },
    },

    // 4️⃣ Mozilla Firefox
    {
      name: 'Mozilla Firefox',
      use: {
        ...devices['Desktop Firefox'],
        locale: 'en-US',
      },
    },

    // 5️⃣ Samsung Internet / Android WebView (Mobile Chrome equivalent)
    {
      name: 'Samsung Internet (Android)',
      use: {
        ...devices['Galaxy S21'],
        locale: 'en-US',
        launchOptions: {
          args: ['--lang=en-US'],
        },
      },
    },

    // 6️⃣ Optional: Opera / Brave / Vivaldi (Chromium-like)
    // Note: Playwright doesn’t have native Opera or Brave channels,
    // but Chrome channel simulates them closely.
    {
      name: 'Opera / Brave (Chromium)',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'en-US',
        launchOptions: {
          args: [
            '--lang=en-US',
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 OPR/100.0.0.0',
          ],
        },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
