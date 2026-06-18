import type { PropsWithChildren } from 'react';
import { Flex } from '@/components/ui/flex';

export function CustomNavListAccordionPanelList(props: PropsWithChildren) {
  return <Flex flexDirection="column" mb={2} {...props} />;
}
