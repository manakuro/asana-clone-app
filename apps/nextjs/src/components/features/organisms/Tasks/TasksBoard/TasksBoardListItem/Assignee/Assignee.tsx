import { AssigneeIconMenu } from '@/components/features/organisms/Menus';
import { useTask } from '@/store/entities/task';
import { memo } from 'react';
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
