import type React from 'react';
import { memo } from 'react';
import { useTasksTaskSectionIds } from '@/components/features/tasks/hooks';
import { Flex } from '@/components/ui/flex';
import { TasksBoardListSection } from '../tasks-board-list-section';

export const TasksBoardList: React.FC = memo(() => {
  const { taskSectionIds } = useTasksTaskSectionIds();

  return (
    <Flex direction="row" flex={1} px={2} pt={2} position="relative">
      {taskSectionIds.map((id, i) => (
        <TasksBoardListSection
          taskSectionId={id}
          key={id}
          showAddButton={taskSectionIds.length === i + 1}
        />
      ))}
    </Flex>
  );
});
