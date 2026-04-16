import { Dialog } from '@/components/ui/Dialog';
import { Portal } from '@/components/ui/Portal';
import { Separator } from '@/components/ui/Separator';
import { Body } from './Body';
import { Header } from './Header';
import { useFileViewerModal } from './useFileViewerModal';

export function FileViewerModal() {
  const { open, onClose } = useFileViewerModal();

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
      size="full"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="gray.700"
            color="white"
            w="100vw"
            h="100vh"
            m={0}
            borderRadius="none"
          >
            <Dialog.Header p={0}>
              <Header />
            </Dialog.Header>
            <Separator />
            <Dialog.Body pb={0} zIndex="tooltip">
              {open && <Body />}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
