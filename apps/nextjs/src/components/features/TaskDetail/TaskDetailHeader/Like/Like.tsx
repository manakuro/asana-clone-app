import { LikeTaskIconButton } from '@/components/features/LikeTaskIconButton';
import { useTaskDetail } from '@/components/features/TaskDetail';
import { memo } from 'react';

export const Like = memo(function Like() {
  const { taskId } = useTaskDetail();

  return <LikeTaskIconButton taskId={taskId} show />;
});
