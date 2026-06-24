import { useMemo } from 'react';
import { LikeTaskIconButton } from '@/components/features/like-task-icon-button';
import { useTaskLikesByTaskId } from '@/store/entities/task-like';
import { useTasksNameContext } from '../tasks-name-provider';

export function Like() {
  const { taskId } = useTasksNameContext();
  const { taskLikes } = useTaskLikesByTaskId(taskId);
  const show = useMemo(() => !!taskLikes.length, [taskLikes.length]);

  return (
    <LikeTaskIconButton
      taskId={taskId}
      show={show}
      size="xs"
      h={5}
      textStyle={{ mt: 0 }}
    />
  );
}
