import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LayoutDefault } from '@/components/ui/layout';
import { Page } from './page';
import { Task } from './task';

const meta = {
  title: 'Pages/Inbox',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <LayoutDefault>
        <Story />
      </LayoutDefault>
    ),
  ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/inbox/task/0BA01GK0BWB1Z78B3A3PK795SFJW9',
        segments: ['task', ['taskId', '0BA01GK0BWB1Z78B3A3PK795SFJW9']],
        searchParams: {},
      },
    },
  },
  render: () => <Page task={<Task taskId="0BA01GK0BWB1Z78B3A3PK795SFJW9" />} />,
};
