import type React from 'react';
import { memo, useCallback } from 'react';
import {
  CheckIcon as AtomsCheckIcon,
  type CheckIconProps,
} from 'src/components/ui/atoms';
import { useTask } from 'src/store/entities/task';

type Props = {
  taskId: string;
  isTransitioning: boolean;
  onEndTransition: () => void;
  onStartTransition: () => void;
} & Omit<CheckIconProps, 'completed'>;

export const CheckIcon: React.FC<Props> = memo((props) => {
  const { taskId, isTransitioning, onEndTransition, onStartTransition } = props;
  const { task, setTask } = useTask(taskId);

  const handleToggleDone = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      e.preventDefault();

      if (!task.completed) {
        onStartTransition();
        setTimeout(async () => {
          await setTask({ completed: !task.completed });
          onEndTransition();
        }, 1000);
        return;
      }

      await setTask({ completed: !task.completed });
      onEndTransition();
    },
    [onEndTransition, onStartTransition, setTask, task.completed],
  );

  return (
    <AtomsCheckIcon
      completed={task.completed}
      onClick={handleToggleDone}
      isTransitioning={isTransitioning}
    />
  );
});
CheckIcon.displayName = 'CheckIcon';
