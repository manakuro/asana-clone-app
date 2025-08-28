import { Badge } from '@/components/ui/atoms';
import { useTaskPriority } from '@/store/entities/taskPriority';
import type React from 'react';
import { memo, useCallback } from 'react';

type Props = {
  taskPriorityId: string;
  onDelete?: () => void;
  onClick?: () => void;
  disableStopPropagation?: boolean;
};

export const PriorityChip = memo(function PriorityChip(props: Props) {
  const { taskPriorityId, onClick, disableStopPropagation } = props;
  const { taskPriority } = useTaskPriority(taskPriorityId);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!disableStopPropagation) {
        e.stopPropagation();
      }
      onClick?.();
    },
    [onClick, disableStopPropagation],
  );

  if (!taskPriorityId) return null;

  return (
    <Badge
      h={5}
      variant="solid"
      bg={taskPriority.color.color}
      textAlign="center"
      fontWeight="medium"
      lineHeight={1.7}
      onClick={handleClick}
    >
      {taskPriority.name}
    </Badge>
  );
});
