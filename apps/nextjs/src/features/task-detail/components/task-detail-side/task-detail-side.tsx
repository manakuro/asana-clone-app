import { memo } from 'react';
import { useTaskDetail } from '@/features/task-detail';
import { Content } from './content';

export const TaskDetailSide = memo(function TaskDetailSide() {
  const { loading } = useTaskDetail();

  return <Content loading={loading} />;
});
