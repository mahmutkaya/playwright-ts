import { PlaywrightTestConfig } from '@playwright/test';
import { devices } from 'playwright';

const config: PlaywrightTestConfig = {
    use: {
        // Browser options
        headless: false,
        slowMo: 1000,

        // Context options
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,

        // Artifacts
        screenshot: 'only-on-failure',
        video: 'retry-with-video',
    },
    projects: [
        {
            name: 'Chrome Stable',
            use: {
                browserName: 'chromium',
                // Test against Chrome Stable channel.
                channel: 'chrome',
            },
        },
        {
            name: 'Desktop Safari',
            use: {
                browserName: 'webkit',
                viewport: { width: 1200, height: 750 },
            }
        },
        // Test against mobile viewports.
        {
            name: 'Mobile Chrome',
            use: devices['Pixel 5'],
        },
        {
            name: 'Mobile Safari',
            use: devices['iPhone 12'],
        },
        {
            name: 'Desktop Firefox',
            use: {
                browserName: 'firefox',
                //viewport: { width: 800, height: 600 },
            }
        },
        // {
        //     name: 'Pixel 4',
        //     use: {
        //         browserName: 'chromium',
        //         ...devices['Pixel 4'],
        //     },
        // },

        // // "iPhone 11" tests use WebKit browser.
        // {
        //     name: 'iPhone 11',
        //     use: {
        //         browserName: 'webkit',
        //         ...devices['iPhone 11'],
        //     },
        // },
    ],
    // Look for test files in the "tests" directory, relative to this configuration file
    testDir: 'tests',

    // Each test is given 30 seconds
    timeout: 30000,

    // Forbid test.only on CI
    forbidOnly: !!process.env.CI,

    // 1 retry for each test
    retries: 1,

    // Limit the number of workers on CI, use default locally
    workers: process.env.CI ? 2 : undefined,
};
export default config;