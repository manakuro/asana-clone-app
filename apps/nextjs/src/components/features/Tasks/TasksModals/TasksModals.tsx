import { DeleteTaskSectionModal } from '@/components/features/Modals';
import type React from 'react';
import { memo } from 'react';

export const TasksModals: React.FC = memo(() => {
  return (
    <>
      <DeleteTaskSectionModal />
    </>
  );
});
