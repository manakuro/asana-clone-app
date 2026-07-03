import { memo } from 'react';
import { LikeTaskIconButton } from '@/features/task/components/like-task-icon-button';
import { useTaskDetail } from '@/features/task-detail';

export const Like = memo(function Like() {
  const { taskId } = useTaskDetail();

  return <LikeTaskIconButton taskId={taskId} show />;
});
