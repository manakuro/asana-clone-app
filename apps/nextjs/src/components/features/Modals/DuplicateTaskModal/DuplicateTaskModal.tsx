import { Modal, ModalOverlay } from '@/components/ui/Modal';
import { Content } from './Content';
import { useDuplicateTaskModal } from './useDuplicateTaskModal';

export function DuplicateTaskModal() {
  const { isOpen, onClose, taskId } = useDuplicateTaskModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      {isOpen && <Content taskId={taskId} />}
    </Modal>
  );
}
