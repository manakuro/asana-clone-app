import type React from 'react';
import { memo } from 'react';
import { useTasksTaskIds } from '@/components/features/tasks/hooks';
import { TasksListItem } from '@/components/features/tasks/tasks-list/tasks-list-item';
import { TasksListSectionProvider } from '@/components/features/tasks/tasks-list/tasks-list-section';
import { Flex } from '@/components/ui/flex';

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
