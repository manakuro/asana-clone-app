import { LayoutDefault } from '@/components/ui/Layout';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { Container as Page } from './Container';

const meta: Meta<typeof Page> = {
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
};

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByRole('tab', { name: 'Board' }));
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
// TODO: fix a failed chromatic test.
// Calendar.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//
//   await userEvent.click(await canvas.findByRole('tab', { name: 'Calendar' }));
// };

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

// TODO: fix a failed chromatic test.
// Files.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//
//   await userEvent.click(await canvas.findByRole('tab', { name: 'Files' }));
// };
