import mockdate from 'mockdate';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { createElement } from 'react';
import { handlers as mutationHandlers } from '../src/mocks/mutations/handlers';
import { handlers as queryHandlers } from '../src/mocks/queries/handlers';
import { Provider } from '../src/storybook/Provider';

const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('WebSocketLink')) {
    return;
  }
  originalWarn(...args);
};

// TODO: Handle unhandled rejections in CI
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    console.error('[Unhandled Rejection]', {
      message: event.reason?.message,
      name: event.reason?.name,
      stack: event.reason?.stack,
      reason: event.reason,
      reasonType: typeof event.reason,
      reasonString: String(event.reason),
      isTrusted: event.isTrusted,
      promise: event.promise,
    });
  });
}

initialize({
  quiet: true,
  onUnhandledRequest: ({ method, url }) => {
    const parsedUrl = new URL(url);
    if (parsedUrl.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)) {
      return;
    }
    if (
      parsedUrl.hostname === 'fonts.googleapis.com' ||
      parsedUrl.hostname === 'fonts.gstatic.com'
    ) {
      return;
    }
    if (parsedUrl.pathname.includes('virtual:next-image')) {
      return;
    }
    if (parsedUrl.pathname.startsWith('/src/')) {
      return;
    }
    console.warn(`[MSW] Unhandled ${method} request to ${url}`);
  },
});

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    nextjs: {
      appDirectory: true,
    },

    msw: {
      handlers: [...queryHandlers, ...mutationHandlers],
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  loaders: [mswLoader],
  decorators: [
    (Story: any, { parameters }: any) => {
      const date = parameters.mockDate ?? '2022-11-29T09:16:39+09:00';

      mockdate.set(date);

      return createElement(Story);
    },
    (Story: any) => createElement(Provider, null, createElement(Story)),
  ],
};

export default preview;
