import { memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/Text';
import { useTaskCommand } from '@/store/entities/task';

type Props = {
  taskId: string;
};

export const DeletedTask = memo(function DeletedTask(props: Props) {
  const { taskId } = props;
  const { undeleteTask } = useTaskCommand();

  const handleUndelete = useCallback(async () => {
    await undeleteTask({ taskId });
  }, [taskId, undeleteTask]);

  return (
    <Flex
      h="44px"
      maxH="44px"
      px={6}
      py={2}
      bg="red.50"
      alignItems="center"
      fontSize="sm"
    >
      <Icon icon="trash" color="alert" />
      <Text fontSize="sm" flex={1} ml={2} color="alert">
        This task is deleted
      </Text>
      <Button size="xs" onClick={handleUndelete} variant="outline" bg="white">
        Undelete
      </Button>
    </Flex>
  );
});
