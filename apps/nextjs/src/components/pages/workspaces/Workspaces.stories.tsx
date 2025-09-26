import { LayoutDefault } from '@/components/ui/Layout';
import type { Meta, StoryObj } from '@storybook/react';
import { Container as Page } from './Container';

const meta: Meta<typeof Page> = {
  title: 'Pages/Workspaces',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/workspaces/0AD01GK0BWAQZYWRN2T89M5K2620Z/overview',
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

export const Overview: Story = {};
