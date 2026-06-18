import { CloseButton } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Dialog } from '@/components/ui/dialog';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Link } from '@/components/ui/link';
import { MoreLink } from '@/components/ui/more-link';
import { Portal } from '@/components/ui/portal';
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
      size="lg"
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
                borderColor="border"
                borderStyle="solid"
                borderRadius="sm"
                p={4}
              >
                <Flex alignItems="center" flex={1}>
                  <Icon icon="lockAlt" color="fg.muted" />
                  <Container fontSize="xs" color="fg.muted" ml={0}>
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
                    colorPalette="teal"
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
