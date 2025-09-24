import { Modal, ModalOverlay } from '@/components/ui/Modal';
import { memo } from 'react';
import { Content } from './Content';
import { useProjectDetailModal } from './useProjectDetailModal';

export const ProjectDetailModal = memo(function ProjectDetailModal() {
  const { isOpen, onClose, projectId } = useProjectDetailModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      {isOpen && <Content projectId={projectId} />}
    </Modal>
  );
});
