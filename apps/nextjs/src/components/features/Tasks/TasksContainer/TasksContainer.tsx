import { type PropsWithChildren, memo } from 'react';
import { TasksModals } from '../TasksModals';
import { TasksProvider, type TasksProviderProps } from '../TasksProvider';

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
