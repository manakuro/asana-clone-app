import { Flex } from '@/components/ui/Flex';
import type { PropsWithChildren } from 'react';

export function CustomNavList(props: PropsWithChildren) {
  return <Flex flexDirection="column" {...props} />;
}
