import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LayoutDefault } from '@/components/ui/layout';
import { Container as Page } from './Container';

const meta = {
  title: 'Pages/Projects',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/list',
        segments: [
          ['projectId', '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G'],
          ['projects', ['list']],
        ],
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

export const List: Story = {};

export const Detail: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname:
          '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/0BA01GK0BWB1Z78B3A3PK795SFJW9',
        segments: [
          ['projectId', '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G'],
          ['projects', ['0BA01GK0BWB1Z78B3A3PK795SFJW9']],
        ],
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
        pathname: '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/board',
        segments: [
          ['projectId', '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G'],
          ['projects', ['board']],
        ],
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
        pathname: '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/calendar',
        segments: [
          ['projectId', '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G'],
          ['projects', ['calendar']],
        ],
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
        pathname: '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/files',
        segments: [
          ['projectId', '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G'],
          ['projects', ['files']],
        ],
        searchParams: {},
      },
    },
  },
};
