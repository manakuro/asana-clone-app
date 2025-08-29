import { LayoutDefault } from '@/components/ui/organisms/Layout';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Container as Page } from './Container';

export default {
  title: 'Pages/MyTasks',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      asPath: '/my_tasks/list',
      path: '/my_tasks',
      query: 'my_tasks',
      pathname: '/my_tasks/[[...my_tasks]]',
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

const Template: ComponentStory<typeof Page> = () => <Page />;

export const List = Template.bind({});

export const Detail = Template.bind({});
Detail.parameters = {
  nextRouter: {
    asPath: '/my_tasks/0BA01GK0BWB1Z78B3A3PK795SFJW9',
    path: '/my_tasks/[[...my_tasks]]',
    pathname: '/my_tasks/[[...my_tasks]]',
    query: {
      my_tasks: ['0BA01GK0BWB1Z78B3A3PK795SFJW9'],
    },
    route: '/my_tasks/[[...my_tasks]]',
  },
};

export const Board = Template.bind({});
Board.parameters = {
  nextRouter: {
    asPath: '/my_tasks/board',
    path: '/my_tasks/[[...my_tasks]]',
    pathname: '/my_tasks/[[...my_tasks]]',
    query: {
      my_tasks: ['board'],
    },
  },
};

export const Calendar = Template.bind({});
Calendar.parameters = {
  nextRouter: {
    asPath: '/my_tasks/calendar',
    path: '/my_tasks/[[...my_tasks]]',
    pathname: '/my_tasks/[[...my_tasks]]',
    query: {
      my_tasks: ['calendar'],
    },
  },
};

export const Files = Template.bind({});
Files.parameters = {
  nextRouter: {
    asPath: '/my_tasks/files',
    path: '/my_tasks/[[...my_tasks]]',
    pathname: '/my_tasks/[[...my_tasks]]',
    query: {
      my_tasks: ['files'],
    },
  },
};
