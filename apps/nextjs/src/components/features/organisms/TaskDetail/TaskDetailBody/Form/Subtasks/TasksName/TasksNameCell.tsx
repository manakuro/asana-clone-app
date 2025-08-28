import {
  TasksListCell,
  type TasksListCellProps,
} from '@/components/features/organisms/Tasks/TasksList/TasksListCell';
import { forwardRef } from 'react';
import type React from 'react';
import { memo } from 'react';
import { useSubtasksNameContext } from './Provider';

type Props = TasksListCellProps;

export const TasksNameCell: React.FC<Props> = memo(
  forwardRef((props, ref) => {
    const { cellStyle } = useSubtasksNameContext();

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
            ...props.containerStyle,
            ...cellStyleContainerStyle,
          }}
          {...cellStyleRest}
        >
          {props.children}
        </TasksListCell>
      </>
    );
  }),
);
