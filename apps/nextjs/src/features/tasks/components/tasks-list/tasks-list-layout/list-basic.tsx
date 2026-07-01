import type React from 'react';
import { memo } from 'react';
import { TasksListSection } from '@/features/tasks/components/tasks-list/tasks-list-section/tasks-list-section';
import { useTasksTaskSectionIds } from '@/features/tasks/hooks';

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
