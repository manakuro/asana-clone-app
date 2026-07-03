import { memo } from 'react';
import { AssigneeIconMenu } from '@/features/task/components/assignee-icon-menu';
import { useTask } from '@/store/entities/task';
import { useAssignee } from './use-assignee';

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
