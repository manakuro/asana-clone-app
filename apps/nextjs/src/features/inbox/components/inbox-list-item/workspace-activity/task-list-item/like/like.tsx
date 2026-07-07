import { memo, useMemo } from 'react';
import { LikeTaskIconButton } from '@/features/task/components/like-task-icon-button';
import { useTaskLikesByTaskId } from '@/features/task/store/task-like';

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
