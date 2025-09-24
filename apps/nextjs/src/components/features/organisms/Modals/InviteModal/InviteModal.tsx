import { useInviteModal } from '@/components/features/organisms/Modals';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@/components/ui/Modal';
import { Box } from '@/components/ui/atoms/Box';
import { Button } from '@/components/ui/atoms/Button';
import { Stack } from '@/components/ui/atoms/Stack';
import { Text } from '@/components/ui/atoms/Text';
import { Textarea } from '@/components/ui/atoms/Textarea';

export function InviteModal() {
  const { isOpen, onClose } = useInviteModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite people to My Workspace</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={6}>
            <Text>
              Your teammates will get an email that gives them access to your
              team.
            </Text>
            <Box>
              <Text fontSize="sm" mb={2}>
                Email addresses
              </Text>
              <Textarea placeholder="name@company.com, name@company.com, …" />
            </Box>
            <Box>
              <Text fontSize="sm" mb={2}>
                Choose a starting project
              </Text>
              <Textarea placeholder="Start typing to add a project" />
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={() => {}} disabled>
            Invite
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
