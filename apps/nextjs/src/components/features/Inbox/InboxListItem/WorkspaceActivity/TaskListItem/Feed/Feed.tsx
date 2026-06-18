import { useMemo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Icon as AtomsIcon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useTaskFeedIdsWithoutFirstByTaskId } from '@/store/entities/taskFeed';

type Props = {
  taskId: string;
};

export function Feed(props: Props) {
  const { taskId } = props;
  const { taskFeedIdsWithoutFirst } =
    useTaskFeedIdsWithoutFirstByTaskId(taskId);
  const size = useMemo(
    () => taskFeedIdsWithoutFirst.length,
    [taskFeedIdsWithoutFirst.length],
  );

  if (!size) return null;

  return (
    <Flex alignItems="center" justifyContent="center" h={5}>
      <Text fontSize="xs" color="fg.muted">
        {size}
      </Text>
      <AtomsIcon icon="messageRounded" color="fg.muted" ml={1} />
    </Flex>
  );
}
