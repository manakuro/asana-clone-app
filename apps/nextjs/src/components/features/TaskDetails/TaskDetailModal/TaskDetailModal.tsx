import { memo, useCallback } from 'react';
import { useTaskDetail } from '@/components/features/TaskDetail';
import { Dialog } from '@/components/ui/Dialog';
import { Portal } from '@/components/ui/Portal';
import { Content } from './Content';
import { useTaskDetailModal } from './useTaskDetailModal';

type Props = {
  backToPage: () => void;
};

export const TaskDetailModal = memo(function TaskDetailModal(props: Props) {
  const { open, onClose } = useTaskDetailModal();
  const { loading } = useTaskDetail();

  const handleClose = useCallback(() => {
    props.backToPage();
    // Execute onClose after the pathname changes to detect URL params.
    setTimeout(() => {
      onClose();
    }, 100);
  }, [onClose, props]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
        }
      }}
      size="xl"
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          {open && <Content loading={loading} onClose={handleClose} />}
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});
