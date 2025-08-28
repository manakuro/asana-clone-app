import { Flex } from '@/components/ui/atoms';
import { useTask } from '@/store/entities/task';
import { memo, useCallback } from 'react';
import { Input } from './Input';

type Props = {
  taskId: string;
};

export const TaskName = memo(function TaskName(props: Props) {
  const { task, setTaskName } = useTask(props.taskId);

  const handleChange = useCallback(
    async (val: string) => {
      await setTaskName(val);
    },
    [setTaskName],
  );

  return (
    <Flex>
      <Input value={task.name} onChange={handleChange} />
    </Flex>
  );
});
