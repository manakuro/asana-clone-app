import { Dialog } from '@/components/ui/dialog';
import { Portal } from '@/components/ui/portal';
import { DarkMode } from '@/lib/chakra-ui/generated/color-mode';
import { Body } from './body';
import { Header } from './header';
import { useFileViewerModal } from './use-file-viewer-modal';

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
        <Dialog.Positioner>
          <DarkMode>
            <Dialog.Content
              bg="bg.emphasized"
              color="white"
              w="100vw"
              h="100vh"
              m={0}
              borderRadius="none"
            >
              <Dialog.Header p={0}>
                <Header />
              </Dialog.Header>
              <Dialog.Body pb={0} zIndex="tooltip">
                <Body />
              </Dialog.Body>
            </Dialog.Content>
          </DarkMode>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
