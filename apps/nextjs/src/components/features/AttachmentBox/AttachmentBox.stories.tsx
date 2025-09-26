import { Container } from '@/storybook/decorators/Container';
import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { Component } from './Component';

type Props = React.ComponentProps<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Features/molecules/AttachmentBox',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

function props(options?: Partial<Props>): Props {
  return {
    size: 'md',
    name: '/files/pdf-test.pdf',
    fileName: 'PDF',
    icon: 'outlineFilePdf',
    src: '/files/pdf-test.pdf',
    ...options,
  };
}

export const PDF: Story = {
  args: props(),
};
