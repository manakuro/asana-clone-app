import { memo } from 'react';
import { TeammateAvatar } from '@/components/features/teammates/components/teammate-avatar';
import type { FlexProps } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { useHover } from '@/hooks/use-hover';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useProjectIdsByTaskId } from '@/store/entities/project-task';
import { useTask } from '@/store/entities/task';
import { CheckIcon } from './check-icon';
import { Container } from './container';
import { Input } from './input';
import { Subtask } from './subtask';
import { TaskName } from './task-name';
import { useListItem } from './use-list-item';

type Props = {
  taskId: string;
} & FlexProps;

export const ListItemForProjectsPage = memo(function ListItemForProjectsPage(
  props: Props,
) {
  const { taskId } = props;
  const { task } = useTask(taskId);
  const { ref, isHovering } = useHover<HTMLDivElement>();
  const { onOpenTaskDetail } = useListItem({ taskId });
  const { projectId } = useProjectsProjectId();
  const { projectIds } = useProjectIdsByTaskId(props.taskId, {
    excluded: [projectId],
  });

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
      <Stack direction="row" gap={1} ml={1} mr="auto">
        <Subtask taskId={taskId} />
      </Stack>
    </Container>
  );
});
