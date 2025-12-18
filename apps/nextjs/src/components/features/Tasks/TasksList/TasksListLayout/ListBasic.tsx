import type React from 'react';
import { memo } from 'react';
import { TasksListSection } from '@/components/features/Tasks';
import { useTasksTaskSectionIds } from '@/components/features/Tasks/hooks';

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
