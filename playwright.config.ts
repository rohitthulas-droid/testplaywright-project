import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60 * 1000,  // 60s timeout per test
  reporter: 'html',

  use:  {
    navigationTimeout: 45 * 1000,  // 45s navigation timeout
    headless: true,  // always headless (required for CI/Linux)
    viewport: null,               // do not force a fixed viewport
    launchOptions: {
      args: process.env.CI ? ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'] : ['--start-maximized'],
      slowMo: process.env.CI ? 0 : 1000,  // no slowdown in CI
    },
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        channel: 'chrome',        // use installed Chrome
        viewport: null,   
    },
    },
  ],
  globalTeardown: require.resolve('./global-teardown.ts'),
});
