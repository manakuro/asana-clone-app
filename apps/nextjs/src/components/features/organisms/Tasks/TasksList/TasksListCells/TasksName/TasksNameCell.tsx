import {
  TasksListCell,
  type TasksListCellProps,
} from '@/components/features/organisms/Tasks/TasksList/TasksListCell';
import { useTasksListSectionContext } from '@/components/features/organisms/Tasks/TasksList/TasksListSection/Provider';
import { forwardRef } from 'react';
import type React from 'react';
import { memo } from 'react';
import { useTasksNameContext } from './TasksNameProvider';

type Props = TasksListCellProps;

export const TasksNameCell: React.FC<Props> = memo(
  forwardRef((props, ref) => {
    const { cellStyle } = useTasksNameContext();
    const { indentedStyle } = useTasksListSectionContext();

    const { containerStyle: cellStyleContainerStyle, ...cellStyleRest } =
      cellStyle ?? { containerStyle: {} };
    return (
      <>
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
      </>
    );
  }),
);
