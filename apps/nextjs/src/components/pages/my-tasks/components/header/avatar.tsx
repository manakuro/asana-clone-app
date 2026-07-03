import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { MyAvatar } from '@/features/teammate/components/my-avatar';

export const Avatar = memo(function Avatar() {
  return (
    <Flex alignItems="center">
      <MyAvatar />
    </Flex>
  );
});
