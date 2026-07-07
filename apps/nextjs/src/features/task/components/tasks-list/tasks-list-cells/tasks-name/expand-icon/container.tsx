import { memo, useMemo } from 'react';
import { useSubtaskIds, useTask } from '@/features/task/store/task';
import { Component } from './component';

type Props = {
  taskId: string;
};

export const Container = memo(function Container(props: Props) {
  const { task } = useTask(props.taskId);
  const { taskIds } = useSubtaskIds(props.taskId);
  const showExpandIcon = useMemo(
    () => !!taskIds.length && !task.taskParentId,
    [taskIds.length, task.taskParentId],
  );

  return <Component showExpandIcon={showExpandIcon} />;
});
