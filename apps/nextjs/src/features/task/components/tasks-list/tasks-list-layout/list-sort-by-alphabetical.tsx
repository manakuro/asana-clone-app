import type React from 'react';
import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { TasksListItem } from '@/features/task/components/tasks-list/tasks-list-item';
import { TasksListSectionContext } from '@/features/task/components/tasks-list/tasks-list-section';
import { useTasksTaskIds } from '@/features/task/hooks';

export const ListSortByAlphabetical: React.FC = memo(() => {
  const { taskIds } = useTasksTaskIds();

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {taskIds.map((id) => (
          <TasksListSectionContext key={id} taskSectionId="">
            <TasksListItem taskId={id} />
          </TasksListSectionContext>
        ))}
      </Flex>
    </Flex>
  );
});
