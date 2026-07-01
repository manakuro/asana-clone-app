import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useTaskActivityTaskIds } from '@/features/inbox/hooks';
import { TaskListItem } from '../task-list-item';

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
