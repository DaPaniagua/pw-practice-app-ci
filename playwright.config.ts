import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';
import dotenv from 'dotenv';

require('dotenv').config();

export default defineConfig<TestOptions>({
  retries: 0,
  reporter: 'html',
  use: {
    baseURL: 'https://playground.bondaracademy.com/',
    globalsQaURL: 'https://playground.bondaracademy.com/pages/iot-dashboard',

    trace: 'on-first-retry',
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080},
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://playground.bondaracademy.com/'
       },
    },
    {
      name: 'chromium',
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        video: {
          mode: 'on',
          size: {width: 1920, height: 1080},
        },
      }
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: 'test-with-page-object.spec.ts',
      use: {
        viewport: {width: 1920, height: 1080},
      }
    },
    {
      name: 'Mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro']
      }
    }
  ],

  //webServer: {
  //  command: 'npm run start',
  //  url: 'https://localhost:3000'
  //  //reuseExistingServer: true,
  //  //url: 'https://playground.bondaracademy.com/'
  //}
});
