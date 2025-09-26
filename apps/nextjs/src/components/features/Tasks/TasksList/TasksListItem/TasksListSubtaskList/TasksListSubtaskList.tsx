import { useSubtaskIds } from '@/store/entities/task';
import { memo } from 'react';
import { useSubtaskListContext } from '../Provider';
import { Container } from './Container';

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
