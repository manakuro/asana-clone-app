import { memo } from 'react';
import { MyAvatar } from '@/components/features/my-avatar';
import { Flex } from '@/components/ui/flex';

export const Avatar = memo(function Avatar() {
  return (
    <Flex alignItems="center">
      <MyAvatar />
    </Flex>
  );
});
