import { Flex, Icon, Link, Portal, Text } from '@/components/ui/atoms';
import {
  MenuList as AtomsMenuList,
  MenuDivider,
  MenuItem,
} from '@/components/ui/organisms/Menu';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDisclosure } from '@/shared/chakra';
import { useCallback } from 'react';
import { PopoverMore } from './PopoverMore';

type Props = {
  onCloseMenu: () => void;
};

export function MenuList(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ref } = useClickOutside<HTMLDivElement>(() => {
    handleCloseAll();
  });

  const handleOpen = useCallback(() => {
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
      <AtomsMenuList ref={ref}>
        <MenuItem onMouseEnter={handleClose} isDisabled>
          My workspace
        </MenuItem>
        <MenuDivider />
        <MenuItem onMouseEnter={handleClose} isDisabled>
          Admin Console
        </MenuItem>
        <MenuItem onMouseEnter={handleOpen}>
          <PopoverMore
            isOpen={isOpen}
            placement="left"
            onClose={handleCloseAll}
          >
            <Flex flex={1}>
              <Text fontSize="sm" flex={1}>
                More
              </Text>
              <Icon icon="chevronRight" />
            </Flex>
          </PopoverMore>
        </MenuItem>
        <MenuDivider />
        <MenuItem onMouseEnter={handleClose} link>
          <Link fontSize="sm" isExternal href="https://google.com">
            Privacy Policy
          </Link>
        </MenuItem>
        <MenuItem onMouseEnter={handleClose} isDisabled>
          Logout
        </MenuItem>
      </AtomsMenuList>
    </Portal>
  );
}
