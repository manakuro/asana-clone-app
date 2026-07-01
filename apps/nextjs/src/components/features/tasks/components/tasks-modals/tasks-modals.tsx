import type React from 'react';
import { memo } from 'react';
import { DeleteTaskSectionModal } from '@/components/features/modals/delete-task-section-modal/delete-task-section-modal';

export const TasksModals: React.FC = memo(() => {
  return <DeleteTaskSectionModal />;
});
