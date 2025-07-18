import { Draggable } from '@hello-pangea/dnd';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { useTasksTaskColumn } from 'src/components/features/organisms/Tasks/hooks';
import { Box } from 'src/components/ui/atoms';
import { CustomField } from 'src/components/ui/molecules';
import { useDraggableInPortal } from 'src/hooks/useDraggableInPortal';
import { useTaskColumn } from 'src/store/entities/taskColumn';

type Props = {
  tasksTaskColumnId: string;
  index: number;
};

export const ListItem: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumn, setTasksTaskColumn } = useTasksTaskColumn(
    props.tasksTaskColumnId,
  );
  const renderDraggable = useDraggableInPortal();
  const { taskColumn } = useTaskColumn(tasksTaskColumn.taskColumnId);

  const isChecked = useMemo(
    () => !tasksTaskColumn.disabled,
    [tasksTaskColumn.disabled],
  );
  const handleChange = useCallback(async () => {
    await setTasksTaskColumn({ disabled: !tasksTaskColumn.disabled });
  }, [setTasksTaskColumn, tasksTaskColumn.disabled]);

  if (!tasksTaskColumn.customizable) return null;

  return (
    <Draggable
      key={taskColumn.name}
      draggableId={taskColumn.name}
      index={props.index}
    >
      {renderDraggable((provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          mb={3}
        >
          <CustomField
            label={taskColumn.name}
            isChecked={isChecked}
            onChange={handleChange}
          />
        </Box>
      ))}
    </Draggable>
  );
});
ListItem.displayName = 'ListItem';
