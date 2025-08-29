import { MyAvatar } from '@/components/features/organisms/MyAvatar';
import { Flex } from '@/components/ui/atoms';
import { memo } from 'react';

export const Avatar = memo(function Avatar() {
  return (
    <Flex alignItems="center">
      <MyAvatar />
    </Flex>
  );
});
