import { DarkMode } from '@/chakra-ui/ui/color-mode';
import { Drawer } from '@/components/ui/drawer';
import { Flex } from '@/components/ui/flex';
import { Portal } from '@/components/ui/portal';
import { Body } from './Body';
import { Footer } from './Footer';
import { useHelp } from './useHelp';

export const HELP_CONTAINER_PADDING = 4;
export function Help() {
  const { open, setIsOpen } = useHelp();

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => {
        setIsOpen(e.open);
      }}
      placement="start"
    >
      <Portal>
        <Drawer.Positioner>
          <DarkMode>
            <Drawer.Content bg="gray.800" color="white" height="100%">
              <Drawer.Header fontSize="md" py={6} px={HELP_CONTAINER_PADDING}>
                <Drawer.Title>Getting started guide</Drawer.Title>
              </Drawer.Header>
              <Flex flexDirection="column" h="full" overflowY="scroll">
                <Drawer.Body
                  flex={1}
                  display="flex"
                  flexDirection="column"
                  p={0}
                >
                  <Body />
                  <Footer />
                </Drawer.Body>
              </Flex>
            </Drawer.Content>
          </DarkMode>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
