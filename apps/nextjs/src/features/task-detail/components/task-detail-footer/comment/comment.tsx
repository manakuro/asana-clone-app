import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { MyAvatar } from '@/features/teammates/components/my-avatar';
import { Input } from './input';

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
