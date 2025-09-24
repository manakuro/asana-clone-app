import { MyAvatar } from '@/components/features/organisms/MyAvatar';
import { Flex } from '@/components/ui/atoms/Flex';
import { memo } from 'react';
import { Input } from './Input';

export const Comment = memo(function Comment() {
  return (
    <Flex flex={1}>
      <Flex alignItems="center" h={9}>
        <MyAvatar size="xs" />
      </Flex>
      <Input />
    </Flex>
  );
});
