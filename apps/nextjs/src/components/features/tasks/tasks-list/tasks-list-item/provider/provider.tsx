import { memo, type PropsWithChildren } from 'react';
import { Provider as SubtaskListProvider } from './subtask-list-provider';
import { Provider as TasksListRowProvider } from './tasks-list-row-provider';

type Props = PropsWithChildren<{
  taskId: string;
}>;

export const Provider = memo(function Provider(props: Props) {
  return (
    <TasksListRowProvider {...props}>
      <SubtaskListProvider {...props}>{props.children}</SubtaskListProvider>
    </TasksListRowProvider>
  );
});
