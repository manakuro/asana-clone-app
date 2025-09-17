import type { Preview } from '@storybook/react';
import mockdate from 'mockdate';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { createElement } from 'react';
import { handlers as mutationHandlers } from '../src/mocks/mutations/handlers';
import { handlers as queryHandlers } from '../src/mocks/queries/handlers';
import { dateFns } from '../src/shared/dateFns';
import { Provider } from '../src/storybook/Provider';

initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
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
  },
  decorators: [
    mswDecorator,
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
