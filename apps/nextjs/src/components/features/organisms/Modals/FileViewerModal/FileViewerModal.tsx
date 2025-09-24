import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@/components/ui/Modal';
import { Divider, PortalManager } from '@/components/ui/atoms';
import { Body } from './Body';
import { Header } from './Header';
import { useFileViewerModal } from './useFileViewerModal';

export function FileViewerModal() {
  const { isOpen, onClose } = useFileViewerModal();

  return (
    <PortalManager zIndex={1800}>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalContent
          bg="gray.700"
          color="white"
          w="100vw"
          h="100vh"
          m={0}
          borderRadius="none"
        >
          <ModalHeader p={0}>
            <Header />
          </ModalHeader>
          <Divider />
          <ModalBody pb={0} zIndex="tooltip">
            {isOpen && <Body />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </PortalManager>
  );
}
