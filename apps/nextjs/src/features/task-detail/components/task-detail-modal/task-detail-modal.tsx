import { memo, useCallback } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Portal } from '@/components/ui/portal';
import { useTaskDetail } from '@/features/task-detail';
import { Content } from './content';
import { useTaskDetailModal } from './use-task-detail-modal';

type Props = {
  backToPage: () => void;
};

export const TaskDetailModal = memo(function TaskDetailModal(props: Props) {
  const { open, onClose } = useTaskDetailModal();
  const { loading } = useTaskDetail();

  const handleClose = useCallback(() => {
    props.backToPage();
    onClose();
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
          <Content loading={loading} onClose={handleClose} />
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});
