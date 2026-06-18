import { memo } from 'react';
import { PriorityChip } from '@/components/features/Chips';
import type { FlexProps } from '@/components/ui/flex';
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
