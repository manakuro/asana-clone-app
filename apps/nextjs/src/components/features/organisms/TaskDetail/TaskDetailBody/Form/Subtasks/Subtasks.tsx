import { useSubtaskIds, useTaskCommand } from '@/store/entities/task';
import { memo, useCallback } from 'react';
import { Label, Row } from '../Row';
import { AddSubtaskButton } from './AddSubtaskButton';
import { TasksName } from './TasksName';

type Props = {
  taskParentId: string;
};
export const SUBTASK_LIST_CONTAINER_ID = 'SUBTASK_LIST_CONTAINER_ID';

export const Subtasks = memo(function Subtasks(props: Props) {
  const { taskIds } = useSubtaskIds(props.taskParentId);
  const { addSubtask } = useTaskCommand();

  const handleAddSubtask = useCallback(async () => {
    await addSubtask({ taskParentId: props.taskParentId });
  }, [addSubtask, props.taskParentId]);

  return (
    <Row
      flexDirection="column"
      alignItems="flex-start"
      id={SUBTASK_LIST_CONTAINER_ID}
    >
      {taskIds.length > 0 && (
        <>
          <Label>Subtasks</Label>
          {taskIds.map((id) => (
            <TasksName taskId={id} key={id} />
          ))}
        </>
      )}
      <AddSubtaskButton onClick={handleAddSubtask} />
    </Row>
  );
});
