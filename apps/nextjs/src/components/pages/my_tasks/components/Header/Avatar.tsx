import { memo } from 'react';
import { MyAvatar } from '@/components/features/MyAvatar';
import { Flex } from '@/components/ui/Flex';

export const Avatar = memo(function Avatar() {
  return (
    <Flex alignItems="center">
      <MyAvatar />
    </Flex>
  );
});
