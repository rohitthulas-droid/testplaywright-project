import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use:  {
    headless: process.env.CI ? true : false,  // headless on CI, headed locally
    viewport: null,               // do not force a fixed viewport
    launchOptions: {
      args: ['--start-maximized'], // ask Chrome to start maximized
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
