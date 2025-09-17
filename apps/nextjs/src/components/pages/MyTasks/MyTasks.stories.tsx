import { LayoutDefault } from '@/components/ui/organisms/Layout';
import type { Meta, StoryObj } from '@storybook/react';
import { Container as Page } from './Container';

const meta: Meta<typeof Page> = {
  title: 'Pages/MyTasks',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      asPath: '/my_tasks/list',
      path: '/my_tasks',
      query: 'my_tasks',
      pathname: '/my_tasks/[[...my_tasks]]',
    },
  },
  decorators: [
    (Story) => (
      <LayoutDefault>
        <Story />
      </LayoutDefault>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const List: Story = {};

export const Detail: Story = {
  parameters: {
    nextRouter: {
      asPath: '/my_tasks/0BA01GK0BWB1Z78B3A3PK795SFJW9',
      path: '/my_tasks/[[...my_tasks]]',
      pathname: '/my_tasks/[[...my_tasks]]',
      query: {
        my_tasks: ['0BA01GK0BWB1Z78B3A3PK795SFJW9'],
      },
      route: '/my_tasks/[[...my_tasks]]',
    },
  },
};

export const Board: Story = {
  parameters: {
    nextRouter: {
      asPath: '/my_tasks/board',
      path: '/my_tasks/[[...my_tasks]]',
      pathname: '/my_tasks/[[...my_tasks]]',
      query: {
        my_tasks: ['board'],
      },
    },
  },
};

export const Calendar: Story = {
  parameters: {
    nextRouter: {
      asPath: '/my_tasks/calendar',
      path: '/my_tasks/[[...my_tasks]]',
      pathname: '/my_tasks/[[...my_tasks]]',
      query: {
        my_tasks: ['calendar'],
      },
    },
  },
};

export const Files: Story = {
  parameters: {
    nextRouter: {
      asPath: '/my_tasks/files',
      path: '/my_tasks/[[...my_tasks]]',
      pathname: '/my_tasks/[[...my_tasks]]',
      query: {
        my_tasks: ['files'],
      },
    },
  },
};
