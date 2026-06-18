import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Tabs } from './Tabs';

export const Header = memo(function Header() {
  return (
    <Flex flex={1}>
      <Tabs />
    </Flex>
  );
});
