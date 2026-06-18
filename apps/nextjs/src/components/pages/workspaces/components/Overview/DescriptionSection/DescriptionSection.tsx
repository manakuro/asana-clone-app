import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import {
  OverviewSectionHeader,
  OverviewSectionHeaderHeading,
} from '../OverviewSectionHeader';
import { Description } from './Description';

export const DescriptionSection = memo(function DescriptionSection() {
  return (
    <Flex flexDirection="column">
      <OverviewSectionHeader>
        <OverviewSectionHeaderHeading>Description</OverviewSectionHeaderHeading>
      </OverviewSectionHeader>
      <Description />
    </Flex>
  );
});
