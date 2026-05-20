import mockdate from 'mockdate';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { createElement } from 'react';
import { handlers as mutationHandlers } from '../src/mocks/mutations/handlers';
import { handlers as queryHandlers } from '../src/mocks/queries/handlers';
import { dateFns } from '../src/shared/dateFns';
import { Provider } from '../src/storybook/Provider';

initialize();

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
    (Story, { parameters }) => {
      const date = parameters.mockDate ?? '2022-11-29T09:16:39+09:00';

      mockdate.set(date);

      const mockedDate = dateFns.format(new Date(date), 'HH:mm:ss dd/MM/yy');
      console.log('[Mocked date]: ', mockedDate);

      return createElement(Story);
    },
    (Story) => createElement(Provider, null, createElement(Story)),
  ],
};

export default preview;
