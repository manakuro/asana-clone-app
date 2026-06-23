import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useTask } from '@/store/entities/task';

type Props = {
  taskId: string;
} & FlexProps;

export const TaskName = memo(function TaskName(props: Props) {
  const { taskId } = props;
  const { task } = useTask(taskId);

  return (
    <Flex
      lineClamp={2}
      flex={1}
      ml={1}
      fontSize="xs"
      fontWeight="medium"
      lineHeight="14px"
    >
      {task.name}
    </Flex>
  );
});
