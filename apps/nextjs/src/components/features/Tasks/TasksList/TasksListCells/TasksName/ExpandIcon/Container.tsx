import { useTask } from '@/store/entities/task';
import { useSubtaskIds } from '@/store/entities/task';
import { memo, useMemo } from 'react';
import { Component } from './Component';

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
