import { memo, useMemo } from 'react';
import { LikeTaskIconButton } from '@/features/tasks/components/like-task-icon-button';
import { useTaskLikesByTaskId } from '@/store/entities/task-like';

type Props = {
  taskId: string;
};

export const Like = memo(function Like(props: Props) {
  const { taskId } = props;
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
});
