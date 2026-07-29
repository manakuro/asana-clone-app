import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LayoutDefault } from '@/components/ui/layout';
import { Page } from './page';

const meta = {
  title: 'Pages/Inbox',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/inbox/task/0BA01GK0BWB1Z78B3A3PK795SFJW9',
        segments: [['inbox', ['task', '0BA01GK0BWB1Z78B3A3PK795SFJW9']]],
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
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
