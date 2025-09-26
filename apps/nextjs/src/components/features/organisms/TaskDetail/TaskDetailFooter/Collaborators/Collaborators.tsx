import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';
import { memo } from 'react';
import { Input } from './Input';
import { LeaveTask } from './LeaveTask';
import { Provider } from './Provider';
import { Teammates } from './Teammates';

export const Collaborators = memo(function Collaborators(props) {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  );
});

const Component = memo(function Component() {
  return (
    <Flex flex={1} mt={4} pl={8} pb={2} alignItems="center">
      <Text fontSize="xs" color="text.muted" fontWeight="medium">
        Collaborators
      </Text>
      <Teammates />
      <Input />
      <LeaveTask />
    </Flex>
  );
});
