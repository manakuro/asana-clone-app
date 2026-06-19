import { memo } from 'react';
import { useTaskDetail } from '@/components/features/TaskDetail';
import { Content } from './content';

export const TaskDetailSide = memo(function TaskDetailSide() {
  const { loading } = useTaskDetail();

  return <Content loading={loading} />;
});
