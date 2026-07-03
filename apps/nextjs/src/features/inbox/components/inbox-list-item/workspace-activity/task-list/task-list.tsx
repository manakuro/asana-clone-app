import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useWorkspaceActivityTaskIds } from '@/features/inbox/hooks';
import { TaskListItem } from '../task-list-item';

type Props = FlexProps & {
  workspaceActivityId: string;
};

export const TaskList = memo(function TaskList(props: Props) {
  const { workspaceActivityId } = props;
  const { taskIds } = useWorkspaceActivityTaskIds(workspaceActivityId);

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
