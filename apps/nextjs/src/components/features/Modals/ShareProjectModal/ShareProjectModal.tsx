import { CloseButton } from '@chakra-ui/react';
import { memo } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Portal } from '@/components/ui/portal';
import { Body } from './Body';
import { Footer } from './Footer';
import { Header } from './Header';
import { useShareProjectModal } from './useShareProjectModal';

export const ShareProjectModal = memo(function ShareProjectModal() {
  const { open, onClose, projectId } = useShareProjectModal();

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
          <Dialog.Content>
            <Header projectId={projectId} />
            <Body projectId={projectId} />
            <Footer />
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});
