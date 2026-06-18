import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LayoutDefault } from '@/components/ui/layout';
import { Container as Page } from './Container';

const meta = {
  title: 'Pages/Inbox',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/inbox',
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
