import { memo } from 'react';
import { useTaskDetail } from '@/components/features/task-detail';
import { LikeTaskIconButton } from '@/components/features/tasks/components/like-task-icon-button';

export const Like = memo(function Like() {
  const { taskId } = useTaskDetail();

  return <LikeTaskIconButton taskId={taskId} show />;
});
