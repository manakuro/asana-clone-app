import type { PropsWithChildren } from 'react';
import { Flex } from '@/components/ui/flex';

export function CustomNavList(props: PropsWithChildren) {
  return <Flex flexDirection="column" {...props} />;
}
