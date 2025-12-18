import type { PropsWithChildren } from 'react';
import { Flex } from '@/components/ui/Flex';

export function CustomNavList(props: PropsWithChildren) {
  return <Flex flexDirection="column" {...props} />;
}
