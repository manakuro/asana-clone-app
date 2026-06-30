import { memo, type PropsWithChildren } from 'react';
import { TasksModals } from '../tasks-modals';
import { TasksContext, type TasksProviderProps } from '../tasks-provider';

type Props = PropsWithChildren<TasksProviderProps>;

export const TasksContainer = memo(function TasksContainer(props: Props) {
  const { isMyTasksPage, isProjectsPage } = props;
  return (
    <TasksContext isMyTasksPage={isMyTasksPage} isProjectsPage={isProjectsPage}>
      <TasksModals />
      {props.children}
    </TasksContext>
  );
});
