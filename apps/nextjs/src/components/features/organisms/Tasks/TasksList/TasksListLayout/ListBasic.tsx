import { TasksListSection } from '@/components/features/organisms/Tasks';
import { useTasksTaskSectionIds } from '@/components/features/organisms/Tasks/hooks';
import type React from 'react';
import { memo } from 'react';

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
