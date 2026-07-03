import { memo } from 'react';
import { useSubTasksQuery } from '@/features/task/api/use-sub-tasks-query';
import { useFirstRender } from '@/hooks/use-first-render';
import { useSubtaskIds } from '@/store/entities/task';
import { SkeletonList } from './skeleton-list';
import { TasksListSubtaskItem } from './tasks-list-subtask-item';

type Props = {
  subTaskIds: string[];
  taskId: string;
};

// TODO: Need to fix a Recoil warning, `Warning: Cannot update a component (`Batcher`)`.
// @see https://github.com/facebookexperimental/Recoil/issues/12
export const Container = memo(function Container(props: Props) {
  const { subTaskIds, taskId } = props;
  const { loading } = useSubTasksQuery({
    where: {
      idIn: subTaskIds,
    },
  });
  const { taskIds } = useSubtaskIds(taskId);
  const { firstRender } = useFirstRender();

  // Perform a query on the first render to prevent loading when adding task.
  if (loading && firstRender) return <SkeletonList />;

  return (
    <>
      {taskIds.map((id) => (
        <TasksListSubtaskItem key={id} taskId={id} />
      ))}
    </>
  );
});
