import { CloseButton } from '@chakra-ui/react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Dialog } from '@/components/ui/Dialog';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';
import { Link } from '@/components/ui/Link';
import { MoreLink } from '@/components/ui/MoreLink';
import { Portal } from '@/components/ui/Portal';
import { useShareWorkspaceModal } from './useShareWorkspaceModal';

export function ShareWorkspaceModal() {
  const { open, onClose } = useShareWorkspaceModal();

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
        }
      }}
      size="xl"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Manage Privacy</Dialog.Header>
            <Dialog.Body mb={4}>
              <Input
                placeholder="name@company.com, name@company.com, …"
                fontSize="sm"
              />
              <Flex
                mt={3}
                border="1px"
                borderColor="gray.200"
                borderRadius="sm"
                p={4}
              >
                <Flex alignItems="center" flex={1}>
                  <Icon icon="lockAlt" color="text.muted" />
                  <Container fontSize="xs" color="text.muted" ml={0}>
                    This view is private to only you. Adding teammates will
                    allow them to view, edit, and organize your work. They will
                    only be able to see tasks they already have access to.{' '}
                    <br />
                    <MoreLink>
                      <Link href="https://google.com" target="_blank">
                        Learn more
                      </Link>
                    </MoreLink>
                  </Container>
                  <Button
                    colorScheme="teal"
                    onClick={() => {}}
                    size="sm"
                    disabled
                  >
                    Invite
                  </Button>
                </Flex>
              </Flex>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
