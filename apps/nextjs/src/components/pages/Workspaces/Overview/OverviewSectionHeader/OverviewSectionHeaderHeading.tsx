import type { FlexProps } from '@/components/ui/atoms/Flex';
import { Heading } from '@/components/ui/atoms/Heading';
import type React from 'react';

type Props = FlexProps;

export const OverviewSectionHeaderHeading: React.FC<Props> = (props) => (
  <Heading as="h3" size="sm">
    {props.children}
  </Heading>
);

OverviewSectionHeaderHeading.displayName = 'OverviewSectionHeaderHeading';
