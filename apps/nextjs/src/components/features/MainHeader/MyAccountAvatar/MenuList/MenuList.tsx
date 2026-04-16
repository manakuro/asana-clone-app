import { useCallback } from 'react';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/components/ui/Link';
import { Menu } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';
import { Text } from '@/components/ui/Text';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDisclosure } from '@/shared/chakra';
import { PopoverMore } from './PopoverMore';

type Props = {
  onCloseMenu: () => void;
};

export function MenuList(props: Props) {
  const { open, onOpen, onClose } = useDisclosure();
  const { ref } = useClickOutside<HTMLDivElement>(() => {
    handleCloseAll();
  });

  const _handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleCloseAll = useCallback(() => {
    onClose();
    props.onCloseMenu();
  }, [onClose, props]);

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content ref={ref}>
          <Menu.Item value="0" onMouseEnter={handleClose} disabled>
            My workspace
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item value="1" onMouseEnter={handleClose} disabled>
            Admin Console
          </Menu.Item>
          <PopoverMore
            open={open}
            positioning={{ placement: 'left' }}
            onClose={handleCloseAll}
          >
            <Flex flex={1}>
              <Text fontSize="sm" flex={1}>
                More
              </Text>
              <Icon icon="chevronRight" />
            </Flex>
          </PopoverMore>
          <Menu.Separator />
          <Menu.Item value="3" onMouseEnter={handleClose} asChild>
            <Link fontSize="sm" target="_blank" href="https://google.com">
              Privacy Policy
            </Link>
          </Menu.Item>
          <Menu.Item value="4" onMouseEnter={handleClose} disabled>
            Logout
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
}
