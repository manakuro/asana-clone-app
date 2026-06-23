import { memo, type PropsWithChildren } from 'react';
import { TasksModals } from '../tasks-modals';
import { TasksProvider, type TasksProviderProps } from '../tasks-provider';

type Props = PropsWithChildren<TasksProviderProps>;

export const TasksContainer = memo(function TasksContainer(props: Props) {
  const { isMyTasksPage, isProjectsPage } = props;
  return (
    <TasksProvider
      isMyTasksPage={isMyTasksPage}
      isProjectsPage={isProjectsPage}
    >
      <TasksModals />
      {props.children}
    </TasksProvider>
  );
});
