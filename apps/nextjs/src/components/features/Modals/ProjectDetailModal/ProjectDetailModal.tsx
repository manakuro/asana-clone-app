import { memo } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { Portal } from '@/components/ui/Portal';
import { Content } from './Content';
import { useProjectDetailModal } from './useProjectDetailModal';

export const ProjectDetailModal = memo(function ProjectDetailModal() {
  const { open, onClose, projectId } = useProjectDetailModal();

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
        }
      }}
      size="lg"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Content projectId={projectId} />
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});
