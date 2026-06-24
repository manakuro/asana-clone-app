import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import {
  OverviewSectionHeader,
  OverviewSectionHeaderHeading,
} from '../overview-section-header';
import { Description } from './description';

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
