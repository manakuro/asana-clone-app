import { memo } from 'react';
import { useTasksContext } from '@/components/features/Tasks';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useTask } from '@/store/entities/task';
import { useTasksNameContext } from '../TasksNameProvider';

export const TaskParentName = memo(function TaskParentName() {
  const { taskId } = useTasksNameContext();
  const { isSubtask, task } = useTask(taskId);
  const { task: taskParent } = useTask(task.taskParentId);
  const { isProjectsPage } = useTasksContext();

  if (!isSubtask || isProjectsPage) return null;

  return (
    <Flex alignItems="center" ml={2}>
      <Icon icon="chevronLeft" color="fg.muted" size="xs" />
      <Text fontSize="xs" color="fg.muted" lineClamp={1} maxW="100px">
        {taskParent.name}
      </Text>
    </Flex>
  );
});
