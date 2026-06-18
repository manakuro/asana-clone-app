import { memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon } from '@/components/ui/check-icon';
import { useTask } from '@/store/entities/task';

type Props = {
  taskId: string;
};

export const Complete = memo(function Complete(props: Props) {
  const { taskId } = props;
  const { task, setTask } = useTask(taskId);

  const handleToggleComplete = useCallback(async () => {
    await setTask({ completed: !task.completed });
  }, [setTask, task.completed]);

  if (task.completed)
    return (
      <Button
        colorPalette="teal"
        variant="outline"
        data-active={true}
        size="xs"
        onClick={handleToggleComplete}
      >
        <CheckIcon completed mt="0.75px" />
        Completed
      </Button>
    );

  return (
    <Button
      colorPalette="teal"
      variant="outline"
      size="xs"
      onClick={handleToggleComplete}
    >
      <CheckIcon completed={false} mt="0.75px" />
      Mark complete
    </Button>
  );
});
