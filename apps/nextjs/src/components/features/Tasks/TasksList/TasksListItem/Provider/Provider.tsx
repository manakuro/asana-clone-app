import { type PropsWithChildren, memo } from 'react';
import { Provider as SubtaskListProvider } from './SubtaskListProvider';
import { Provider as TasksListRowProvider } from './TasksListRowProvider';

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
