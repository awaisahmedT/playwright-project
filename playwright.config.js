import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 60 * 1000,
    expect: {
        timeout: 5000
    },
    reporter: [['list'], ['html', { open: 'never' }]],
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                headless: true
            }
        },
        {
            name: 'chrome',
            use: {
                browserName: 'chromium',
                channel: 'chrome',
                headless: true
            }
        },
        {
            name: 'firefox',
            use: {
                browserName: 'firefox'
            }
        },
        {
            name: 'webkit',
            use: {
                browserName: 'webkit'
            }
        }
    ]
});
