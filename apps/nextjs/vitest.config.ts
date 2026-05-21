import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    projects: [
      // Unit tests: Pure functions and single components (no MSW)
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'happy-dom',
          globals: true,
          setupFiles: ['vitest/setup.ts'],
          include: ['src/**/*.test.ts?(x)'],
          exclude: ['src/**/*.integration.test.tsx'],
          mockReset: true,
          restoreMocks: true,
        },
      },
      // Integration tests: React components with MSW
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
      // Storybook tests: UI visual/interaction tests
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
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
