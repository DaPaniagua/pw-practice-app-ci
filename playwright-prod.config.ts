import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';
import dotenv from 'dotenv';

require('dotenv').config();

export default defineConfig<TestOptions>({
  use: {
    baseURL: 'https://playground.bondaracademy.com/',
    globalsQaURL: 'https://playground.bondaracademy.com/pages/iot-dashboard',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
    }
  ],
});