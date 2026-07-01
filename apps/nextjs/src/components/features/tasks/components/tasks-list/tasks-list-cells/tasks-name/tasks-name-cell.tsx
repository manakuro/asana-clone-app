import type React from 'react';
import { forwardRef, memo } from 'react';
import {
  TasksListCell,
  type TasksListCellProps,
} from '@/components/features/tasks/components/tasks-list/tasks-list-cell';
import { useTasksListSectionContext } from '@/components/features/tasks/components/tasks-list/tasks-list-section/context';
import { useTasksNameContext } from './tasks-name-context';

type Props = TasksListCellProps;

export const TasksNameCell: React.FC<Props> = memo(
  forwardRef((props, ref) => {
    const { cellStyle } = useTasksNameContext();
    const { indentedStyle } = useTasksListSectionContext();

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
          position: 'relative',
          ...props.containerStyle,
          ...cellStyleContainerStyle,
        }}
        {...cellStyleRest}
        {...indentedStyle}
      >
        {props.children}
      </TasksListCell>
    );
  }),
);
