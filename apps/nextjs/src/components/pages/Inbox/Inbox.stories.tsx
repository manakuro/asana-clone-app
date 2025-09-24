import { LayoutDefault } from '@/components/ui/Layout';
import type { Meta, StoryObj } from '@storybook/react';
import { Container as Page } from './Container';

const meta: Meta<typeof Page> = {
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
