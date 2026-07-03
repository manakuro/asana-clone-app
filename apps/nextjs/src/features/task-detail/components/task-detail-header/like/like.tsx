import { memo } from 'react';
import { useTaskDetail } from '@/features/task-detail';
import { LikeTaskIconButton } from '@/features/tasks/components/like-task-icon-button';

export const Like = memo(function Like() {
  const { taskId } = useTaskDetail();

  return <LikeTaskIconButton taskId={taskId} show />;
});
