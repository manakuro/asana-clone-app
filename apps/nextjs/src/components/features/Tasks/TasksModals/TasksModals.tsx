import type React from 'react';
import { memo } from 'react';
import { DeleteTaskSectionModal } from '@/components/features/Modals';

export const TasksModals: React.FC = memo(() => {
  return <DeleteTaskSectionModal />;
});
