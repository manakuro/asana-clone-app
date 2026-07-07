import { memo } from 'react';
import { useIsTaskDeleted } from '@/features/task/store/task';
import { DeletedTask } from './deleted-task';
import { MakePublic } from './make-public';

type Props = {
  taskId: string;
};

export const Info = memo(function Info(props: Props) {
  const { taskId } = props;
  const { isTaskDeleted } = useIsTaskDeleted(taskId);

  if (isTaskDeleted) {
    return <DeletedTask taskId={taskId} />;
  }

  return <MakePublic />;
});
