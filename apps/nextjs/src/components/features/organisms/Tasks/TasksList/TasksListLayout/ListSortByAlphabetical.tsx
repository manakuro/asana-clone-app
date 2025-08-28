import { TasksListItem } from '@/components/features/organisms/Tasks/TasksList/TasksListItem';
import { TasksListSectionProvider } from '@/components/features/organisms/Tasks/TasksList/TasksListSection';
import { useTasksTaskIds } from '@/components/features/organisms/Tasks/hooks';
import { Flex } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

export const ListSortByAlphabetical: React.FC = memo(() => {
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
