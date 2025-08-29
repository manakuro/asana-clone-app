import { Divider } from '@/components/features/organisms/Navigation/Divider';
import { Flex } from '@/components/ui/atoms';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
} from '@/components/ui/organisms/Drawer';
import { Body } from './Body';
import { Footer } from './Footer';
import { useHelp } from './useHelp';

export const HELP_CONTAINER_PADDING = 4;
export function Help() {
  const { isOpen, onClose } = useHelp();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      isFullHeight
      colorScheme="gray"
    >
      <DrawerContent bg="gray.700" color="white">
        <DrawerCloseButton top="1.25rem" />
        <DrawerHeader fontSize="md" py={6} px={HELP_CONTAINER_PADDING}>
          Getting started guide
        </DrawerHeader>
        <Divider />

        <Flex flexDirection="column" h="full" overflowY="scroll">
          <DrawerBody flex={1} display="flex" flexDirection="column" p={0}>
            <Body />
            <Footer />
          </DrawerBody>
        </Flex>
      </DrawerContent>
    </Drawer>
  );
}
