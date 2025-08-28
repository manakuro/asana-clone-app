import { LikeTaskIconButton } from '@/components/features/molecules/LikeTaskIconButton';
import { useTaskLikesByTaskId } from '@/store/entities/taskLike';
import { memo, useMemo } from 'react';

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
