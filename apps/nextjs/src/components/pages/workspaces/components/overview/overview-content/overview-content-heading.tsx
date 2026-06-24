import type React from 'react';
import { Heading, type HeadingProps } from '@/components/ui/heading';

type Props = HeadingProps;

export const OverviewContentHeading: React.FC<Props> = (props) => {
  return <Heading as="h2" size="md" {...props} />;
};
OverviewContentHeading.displayName = 'OverviewContentHeading';
