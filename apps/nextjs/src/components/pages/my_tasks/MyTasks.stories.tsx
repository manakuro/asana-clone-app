import { LayoutDefault } from '@/components/ui/Layout';
import type { Meta, StoryObj } from '@storybook/react';
import { Container as Page } from './Container';

const meta: Meta<typeof Page> = {
  title: 'Pages/MyTasks',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/my_tasks',
        searchParams: {},
      },
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
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/my_tasks/0BA01GK0BWB1Z78B3A3PK795SFJW9',
        segments: [['my_tasks', ['0BA01GK0BWB1Z78B3A3PK795SFJW9']]],
        searchParams: {},
      },
    },
  },
};

export const Board: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/my_tasks/board',
        searchParams: {},
      },
    },
  },
};

export const Calendar: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/my_tasks/calendar',
        searchParams: {},
      },
    },
  },
};

export const Files: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/my_tasks/files',
        searchParams: {},
      },
    },
  },
};
