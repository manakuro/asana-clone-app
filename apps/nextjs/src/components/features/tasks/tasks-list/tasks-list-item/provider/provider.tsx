import { memo, type PropsWithChildren } from 'react';
import { Context as SubtaskListContext } from './subtask-list-provider';
import { Context as TasksListRowContext } from './tasks-list-row-provider';

type Props = PropsWithChildren<{
  taskId: string;
}>;

export const Context = memo(function Context(props: Props) {
  return (
    <TasksListRowContext {...props}>
      <SubtaskListContext {...props}>{props.children}</SubtaskListContext>
    </TasksListRowContext>
  );
});
