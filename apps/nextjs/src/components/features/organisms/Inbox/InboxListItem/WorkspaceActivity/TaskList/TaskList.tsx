import { useWorkspaceActivityTaskIds } from '@/components/features/organisms/Inbox/hooks';
import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';
import { TaskListItem } from '../TaskListItem';

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
