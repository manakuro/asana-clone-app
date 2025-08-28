import { TeammateAvatar } from '@/components/features/organisms/TeammateAvatar';
import { type FlexProps, Stack } from '@/components/ui/atoms';
import { useHover } from '@/hooks/useHover';
import { useProjectIdsByTaskId } from '@/store/entities/projectTask';
import { useTask } from '@/store/entities/task';
import { memo } from 'react';
import { CheckIcon } from './CheckIcon';
import { Container } from './Container';
import { Input } from './Input';
import { Subtask } from './Subtask';
import { TaskName } from './TaskName';
import { useListItem } from './useListItem';

type Props = {
  taskId: string;
} & FlexProps;

export const ListItemForMyTasksPage = memo(function ListItemForMyTasksPage(
  props: Props,
) {
  const { taskId } = props;
  const { task } = useTask(taskId);
  const { ref, isHovering } = useHover();
  const { onOpenTaskDetail } = useListItem({ taskId });
  const { projectIds } = useProjectIdsByTaskId(taskId);

  if (task.isNew) {
    return <Input taskId={taskId} />;
  }

  return (
    <Container
      taskId={taskId}
      ref={ref}
      onClick={onOpenTaskDetail}
      projectId={projectIds[0]}
    >
      <CheckIcon
        taskId={taskId}
        isHovering={isHovering}
        projectId={projectIds[0]}
      />
      {task.assigneeId && (
        <TeammateAvatar
          teammateId={task.assigneeId}
          showProfile={false}
          ml={1}
          size="xs"
        />
      )}
      <TaskName taskId={taskId} />
      <Stack direction="row" spacing={1} ml={1} mr="auto">
        <Subtask taskId={taskId} />
      </Stack>
    </Container>
  );
});
