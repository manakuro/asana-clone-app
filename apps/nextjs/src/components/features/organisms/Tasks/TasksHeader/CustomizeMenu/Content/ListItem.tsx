import { useTasksTaskColumn } from '@/components/features/organisms/Tasks/hooks';
import { Box } from '@/components/ui/atoms';
import { CustomField } from '@/components/ui/molecules';
import { useDraggableInPortal } from '@/hooks/useDraggableInPortal';
import { useTaskColumn } from '@/store/entities/taskColumn';
import { Draggable } from '@hello-pangea/dnd';
import { memo, useCallback, useMemo } from 'react';

type Props = {
  tasksTaskColumnId: string;
  index: number;
};

export const ListItem = memo(function ListItem(props: Props) {
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
