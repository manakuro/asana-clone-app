import { memo } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { PriorityChip } from '@/features/task/components/priority-chip';
import { useTask } from '@/store/entities/task';

type Props = FlexProps & {
  taskId: string;
};

export const Priority = memo(function Priority(props: Props) {
  const { taskId } = props;
  const { task } = useTask(taskId);

  return (
    <PriorityChip taskPriorityId={task.taskPriorityId} disableStopPropagation />
  );
});
