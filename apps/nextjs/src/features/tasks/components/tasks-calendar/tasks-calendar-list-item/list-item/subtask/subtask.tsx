import { useMemo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useSubtaskIds } from '@/store/entities/task';

type Props = {
  taskId: string;
};

export function Subtask(props: Props) {
  const { taskId } = props;
  const { taskIds } = useSubtaskIds(taskId);
  const size = useMemo(() => taskIds.length, [taskIds.length]);

  if (!size) return null;

  return (
    <Flex alignItems="center" justifyContent="center">
      <Text fontSize="xs" color="inherit">
        {size}
      </Text>
      <Icon icon="flowChildren" color="inherit" />
    </Flex>
  );
}
