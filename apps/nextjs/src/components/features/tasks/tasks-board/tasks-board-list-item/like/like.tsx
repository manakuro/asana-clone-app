import { memo, useMemo } from 'react';
import { LikeTaskIconButton } from '@/components/features/like-task-icon-button';
import { useTaskLikesByTaskId } from '@/store/entities/taskLike';
import { useTasksBoardListItemContext } from '../provider';

type Props = {
  taskId: string;
};

export const Like = memo(function Like(props: Props) {
  const { taskId } = props;
  const { taskLikes } = useTaskLikesByTaskId(taskId);
  const { isHovering } = useTasksBoardListItemContext();
  const show = useMemo(() => {
    if (taskLikes.length) return true;
    return isHovering;
  }, [isHovering, taskLikes.length]);

  return (
    <LikeTaskIconButton
      taskId={taskId}
      show={show}
      size="xs"
      h={5}
      textStyle={{ mt: '1px' }}
    />
  );
});
