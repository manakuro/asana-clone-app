import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import { Input } from './input';
import { LeaveTask } from './leave-task';
import { Context } from './provider';
import { Teammates } from './teammates';

export const Collaborators = memo(function Collaborators(props) {
  return (
    <Context>
      <Component {...props} />
    </Context>
  );
});

const Component = memo(function Component() {
  return (
    <Flex flex={1} mt={4} pl={8} pb={2} alignItems="center">
      <Text fontSize="xs" color="fg.muted" fontWeight="medium">
        Collaborators
      </Text>
      <Teammates />
      <Input />
      <LeaveTask />
    </Flex>
  );
});
