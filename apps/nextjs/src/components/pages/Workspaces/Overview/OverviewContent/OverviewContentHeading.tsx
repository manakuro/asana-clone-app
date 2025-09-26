import { Heading, type HeadingProps } from '@/components/ui/Heading';
import type React from 'react';

type Props = HeadingProps;

export const OverviewContentHeading: React.FC<Props> = (props) => {
  return <Heading as="h2" size="md" {...props} />;
};
OverviewContentHeading.displayName = 'OverviewContentHeading';
