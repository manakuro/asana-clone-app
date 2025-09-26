import { useTaskDetail } from '@/components/features/TaskDetail';
import { Modal, ModalOverlay } from '@/components/ui/Modal';
import { memo, useCallback } from 'react';
import { Content } from './Content';
import { useTaskDetailModal } from './useTaskDetailModal';

type Props = {
  backToPage: () => void;
};

export const TaskDetailModal = memo(function TaskDetailModal(props: Props) {
  const { isOpen, onClose } = useTaskDetailModal();
  const { loading } = useTaskDetail();

  const handleClose = useCallback(() => {
    props.backToPage();
    // Execute onClose after the pathname changes to detect URL params.
    setTimeout(() => {
      onClose();
    }, 100);
  }, [onClose, props]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="4xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      {isOpen && <Content loading={loading} onClose={handleClose} />}
    </Modal>
  );
});
