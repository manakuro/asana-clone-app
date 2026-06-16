import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Test Configuration:
// | Project     | Pattern                        | Environment | Purpose                                                          |
// |-------------|--------------------------------|-------------|------------------------------------------------------------------|
// | unit        | *.test.ts, *.test.tsx          | happy-dom   | Pure logic: utility functions, custom hooks, data transforms     |
// | integration | *.integration.test.tsx         | happy-dom   | User flows across components with MSW (async, routing, auth)     |
// | storybook   | *.stories.tsx                  | browser     | Visual states, a11y, and interaction tests per component         |
//
// Guideline:
// - unit        → no UI involved; test fails? tell the engineer.
// - integration → MSW-mocked API + multi-component flow; test fails? tell the engineer.
// - storybook   → each visual state (loading/error/empty/success) + a11y; test fails? tell the designer.
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'happy-dom',
          globals: true,
          setupFiles: ['vitest/setup.ts'],
          include: ['src/**/*.unit.test.ts?(x)'],
          mockReset: true,
          restoreMocks: true,
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          environment: 'happy-dom',
          globals: true,
          setupFiles: ['vitest/setup.ts'],
          include: ['src/**/*.integration.test.tsx'],
          mockReset: true,
          restoreMocks: true,
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        optimizeDeps: {
          include: [
            'graphql',
            '@apollo/client',
            '@apollo/client/react',
            'mockdate',
            'msw-storybook-addon',
            'deepmerge',
            'react-icons/ai',
            'react-icons/bi',
            'react-icons/bs',
            'react-icons/fa',
            'react-icons/fi',
            'react-icons/hi',
            'react-icons/io',
            'react-icons/md',
            'react-icons/ti',
            'react-icons/lu',
          ],
        },
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
});
