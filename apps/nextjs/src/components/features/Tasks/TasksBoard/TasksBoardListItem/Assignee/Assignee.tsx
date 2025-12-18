import { memo } from 'react';
import { AssigneeIconMenu } from '@/components/features/Menus';
import { useTask } from '@/store/entities/task';
import { useAssignee } from './useAssignee';

type Props = {
  taskId: string;
};

export const Assignee = memo(function Assignee(props: Props) {
  const { taskId } = props;
  const { task } = useTask(taskId);
  const { onAssigneeClosed, onAssigneeOpened, showIcon } = useAssignee();

  return (
    <AssigneeIconMenu
      taskId={taskId}
      assigneeId={task.assigneeId}
      onAssigneeClosed={onAssigneeClosed}
      onAssigneeOpened={onAssigneeOpened}
      showIcon={showIcon}
    />
  );
});
