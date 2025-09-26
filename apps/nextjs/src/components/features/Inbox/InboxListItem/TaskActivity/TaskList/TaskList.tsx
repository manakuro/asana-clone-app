import { useTaskActivityTaskIds } from '@/components/features/Inbox/hooks';
import { Flex, type FlexProps } from '@/components/ui/Flex';
import { memo } from 'react';
import { TaskListItem } from '../TaskListItem';

type Props = FlexProps & {
  taskActivityId: string;
};

export const TaskList = memo<Props>(function TaskList(props) {
  const { taskActivityId } = props;
  const { taskIds } = useTaskActivityTaskIds(taskActivityId);

  return (
    <Flex flex={1} mt={4} flexDirection="column">
      {taskIds.map((id, i) => (
        <TaskListItem
          taskId={id}
          key={id}
          isFirst={i === 0}
          isLast={taskIds.length - 1 === i}
        />
      ))}
    </Flex>
  );
});
