import { LikeTaskIconButton } from '@/components/features/LikeTaskIconButton';
import { useTaskLikesByTaskId } from '@/store/entities/taskLike';
import { useMemo } from 'react';
import { useTasksNameContext } from '../TasksNameProvider';

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
