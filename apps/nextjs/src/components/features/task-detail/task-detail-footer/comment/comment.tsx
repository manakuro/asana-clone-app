import { memo } from 'react';
import { MyAvatar } from '@/components/features/my-avatar';
import { Flex } from '@/components/ui/flex';
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
