import type React from 'react';
import { forwardRef, memo } from 'react';
import {
  TasksListCell,
  type TasksListCellProps,
} from '@/components/features/tasks/components/tasks-list/tasks-list-cell';
import { useSubtasksNameContext } from './context';

type Props = TasksListCellProps;

export const TasksNameCell: React.FC<Props> = memo(
  forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { cellStyle } = useSubtasksNameContext();

    const { containerStyle: cellStyleContainerStyle, ...cellStyleRest } =
      cellStyle ?? { containerStyle: {} };
    return (
      <TasksListCell
        fontSize="sm"
        cursor="pointer"
        borderLeft="none"
        onClick={props.onClick}
        hover
        justifyContent="flex-end"
        ref={ref}
        {...props}
        containerStyle={{
          ...props.containerStyle,
          ...cellStyleContainerStyle,
        }}
        {...cellStyleRest}
      >
        {props.children}
      </TasksListCell>
    );
  }),
);
