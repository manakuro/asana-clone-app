import type React from 'react';
import { memo } from 'react';
import { useTasksTaskSectionIds } from '@/components/features/tasks/hooks';
import { TasksListSection } from '@/components/features/tasks/tasks-list/tasks-list-section/tasks-list-section';

export const ListBasic: React.FC = memo(() => {
  const { taskSectionIds } = useTasksTaskSectionIds();

  return (
    <>
      {taskSectionIds.map((id, i) => (
        <TasksListSection
          taskSectionId={id}
          key={id}
          showAddButton={taskSectionIds.length === i + 1}
        />
      ))}
    </>
  );
});
