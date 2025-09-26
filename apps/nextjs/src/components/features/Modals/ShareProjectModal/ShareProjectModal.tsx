import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@/components/ui/Modal';
import { memo } from 'react';
import { Body } from './Body';
import { Footer } from './Footer';
import { Header } from './Header';
import { useShareProjectModal } from './useShareProjectModal';

export const ShareProjectModal = memo(function ShareProjectModal() {
  const { isOpen, onClose, projectId } = useShareProjectModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        {isOpen && <Header projectId={projectId} />}
        <ModalCloseButton />
        {isOpen && <Body projectId={projectId} />}
        {isOpen && <Footer />}
      </ModalContent>
    </Modal>
  );
});
