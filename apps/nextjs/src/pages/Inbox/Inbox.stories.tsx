import { LayoutDefault } from '@/components/ui/organisms/Layout';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Container as Page } from './Container';

export default {
  title: 'Pages/Inbox',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      asPath: '/inbox',
      path: '/inbox/[[...inbox]]',
      pathname: '/inbox/[[...inbox]]',
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

const Template: ComponentStory<typeof Page> = (args: any) => <Page {...args} />;

export const Default = Template.bind({});
