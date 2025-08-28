import { LayoutDefault } from '@/components/ui/organisms/Layout';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Container as Page } from './Container';

export default {
  title: 'Pages/Projects',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      asPath: '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/list',
      path: '/projects/[projectId]',
      query: {
        projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
        projects: ['list'],
      },
      pathname: '/projects/[projectId]/[[...projects]]',
    },
  },
  decorators: [
    (Story) => (
      <LayoutDefault>
        <Story />
      </LayoutDefault>
    ),
  ],
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const List = Template.bind({});

export const Detail = Template.bind({});
Detail.parameters = {
  nextRouter: {
    asPath:
      '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/0BA01GK0BWB1Z78B3A3PK795SFJW9',
    path: '/projects/[projectId]/[[...projects]]',
    pathname: '/projects/[projectId]/[[...projects]]',
    query: {
      projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
      projects: ['0BA01GK0BWB1Z78B3A3PK795SFJW9'],
    },
    route: '/projects/[projectId]/[[...projects]]',
  },
};

export const Board = Template.bind({});
Board.parameters = {
  nextRouter: {
    asPath: '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/board',
    path: '/projects/[projectId]/board',
    query: {
      projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
      projects: ['board'],
    },
  },
};
Board.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(await canvas.findByRole('tab', { name: 'Board' }));
};

export const Calendar = Template.bind({});
Calendar.parameters = {
  nextRouter: {
    asPath: '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/calendar',
    path: '/projects/[projectId]/calendar',
    query: {
      projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
      projects: ['calendar'],
    },
  },
};
// TODO: fix a failed chromatic test.
// Calendar.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//
//   await userEvent.click(await canvas.findByRole('tab', { name: 'Calendar' }));
// };

export const Files = Template.bind({});
Files.parameters = {
  nextRouter: {
    asPath: '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/files',
    path: '/projects/[projectId]/files',
    query: {
      projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
      projects: ['files'],
    },
  },
};

// TODO: fix a failed chromatic test.
// Files.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//
//   await userEvent.click(await canvas.findByRole('tab', { name: 'Files' }));
// };
