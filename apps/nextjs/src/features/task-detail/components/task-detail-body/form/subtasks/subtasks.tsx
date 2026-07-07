import { memo, useCallback } from 'react';
import { useSubtaskIds, useTaskCommand } from '@/features/task/store/task';
import { Label, Row } from '../row';
import { AddSubtaskButton } from './add-subtask-button';
import { TasksName } from './tasks-name';

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
