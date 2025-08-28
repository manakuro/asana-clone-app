import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { Modal, ModalOverlay } from '@/components/ui/organisms/Modal';
import { memo, useCallback } from 'react';
import { Content } from './Content';
import { useTaskDetailModal } from './useTaskDetailModal';

type Props = {
  backToPage: () => Promise<void>;
};

export const TaskDetailModal = memo(function TaskDetailModal(props: Props) {
  const { isOpen, onClose } = useTaskDetailModal();
  const { loading } = useTaskDetail();

  const handleClose = useCallback(() => {
    onClose();
    props.backToPage();
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
