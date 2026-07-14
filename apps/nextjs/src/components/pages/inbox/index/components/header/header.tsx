import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Tabs } from './tabs';

export const Header = memo(function Header() {
  return (
    <Flex flex={1}>
      <Tabs />
    </Flex>
  );
});
