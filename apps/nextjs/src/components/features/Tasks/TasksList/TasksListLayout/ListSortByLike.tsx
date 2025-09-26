import { TasksListItem } from '@/components/features/Tasks/TasksList/TasksListItem';
import { TasksListSectionProvider } from '@/components/features/Tasks/TasksList/TasksListSection';
import { useTasksTaskIds } from '@/components/features/Tasks/hooks';
import { Flex } from '@/components/ui/Flex';
import type React from 'react';
import { memo } from 'react';

export const ListSortByLike: React.FC = memo(() => {
  const { taskIds } = useTasksTaskIds();
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {taskIds.map((id) => (
          <TasksListSectionProvider key={id} taskSectionId="">
            <TasksListItem taskId={id} />
          </TasksListSectionProvider>
        ))}
      </Flex>
    </Flex>
  );
});
