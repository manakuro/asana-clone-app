import type React from 'react';
import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { TasksListItem } from '@/features/tasks/components/tasks-list/tasks-list-item';
import { TasksListSectionContext } from '@/features/tasks/components/tasks-list/tasks-list-section';
import { useTasksTaskIds } from '@/features/tasks/hooks';

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
