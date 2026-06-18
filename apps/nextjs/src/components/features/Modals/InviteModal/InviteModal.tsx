import { CloseButton } from '@chakra-ui/react';
import { useInviteModal } from '@/components/features/Modals';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Portal } from '@/components/ui/portal';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';

export function InviteModal() {
  const { open, onClose } = useInviteModal();

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
            <Dialog.Header>Invite people to My Workspace</Dialog.Header>
            <Dialog.Body>
              <Stack gap={6}>
                <Text>
                  Your teammates will get an email that gives them access to
                  your team.
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
            </Dialog.Body>
            <Dialog.Footer>
              <Button colorPalette="teal" onClick={() => {}} disabled>
                Invite
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
