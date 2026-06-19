import { memo } from 'react';
import { LikeTaskIconButton } from '@/components/features/like-task-icon-button';
import { useTaskDetail } from '@/components/features/TaskDetail';

export const Like = memo(function Like() {
  const { taskId } = useTaskDetail();

  return <LikeTaskIconButton taskId={taskId} show />;
});
