import { Flex, type FlexProps } from '@/components/ui/Flex';
import type React from 'react';

type Props = FlexProps;

export const OverviewSectionHeaderRight: React.FC<Props> = (props) => (
  <Flex ml="auto">{props.children}</Flex>
);

OverviewSectionHeaderRight.displayName = 'OverviewSectionHeaderRight';
