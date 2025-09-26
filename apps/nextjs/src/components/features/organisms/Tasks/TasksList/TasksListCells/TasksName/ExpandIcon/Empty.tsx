import { Flex } from '@/components/ui/Flex';
import type React from 'react';
import { memo } from 'react';

export const Empty: React.FC = memo(() => {
  return <Flex h={5} minW={5} p={0} />;
});
