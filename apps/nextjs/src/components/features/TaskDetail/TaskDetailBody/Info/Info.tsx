import { memo } from 'react';
import { useIsTaskDeleted } from '@/store/entities/task';
import { DeletedTask } from './DeletedTask';
import { MakePublic } from './MakePublic';

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
