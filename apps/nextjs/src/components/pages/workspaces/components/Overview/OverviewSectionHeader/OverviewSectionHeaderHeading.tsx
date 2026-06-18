import type React from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { Heading } from '@/components/ui/heading';

type Props = FlexProps;

export const OverviewSectionHeaderHeading: React.FC<Props> = (props) => (
  <Heading as="h3" size="sm">
    {props.children}
  </Heading>
);

OverviewSectionHeaderHeading.displayName = 'OverviewSectionHeaderHeading';
