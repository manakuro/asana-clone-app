import { memo } from 'react';
import { useSubtaskIds } from '@/features/task/store/task';
import { useSubtaskListContext } from '../provider';
import { Container } from './container';

type Props = {
  taskId: string;
};

export const TasksListSubtaskList = memo(function TasksListSubtaskList(
  props: Props,
) {
  const { isSubtaskExpanded } = useSubtaskListContext();
  const { taskIds } = useSubtaskIds(props.taskId);

  if (!taskIds.length) return null;
  if (!isSubtaskExpanded) return null;

  return <Container subTaskIds={taskIds} taskId={props.taskId} />;
});
