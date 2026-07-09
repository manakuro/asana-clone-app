import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LayoutDefault } from '@/components/ui/layout';
import { Page } from './page';

const meta: Meta<typeof Page> = {
  title: 'Pages/Home',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
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
