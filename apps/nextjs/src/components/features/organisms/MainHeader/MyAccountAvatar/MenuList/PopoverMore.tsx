import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  type MenuProps,
} from '@/components/ui/organisms/Menu';
import { chakra } from '@/shared/chakra';
import { useCallback } from 'react';

type Props = {
  onClose: () => void;
} & MenuProps;

export function PopoverMore(props: Props) {
  const handleCreateNewWorkspace = useCallback(() => {
    // do something
    props.onClose();
  }, [props]);

  const handleRemoveMe = useCallback(() => {
    // do something
    props.onClose();
  }, [props]);

  return (
    <Menu isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" mr="5px">
        <MenuItem as="div" onClick={handleCreateNewWorkspace} isDisabled>
          Create New Workspace
        </MenuItem>
        <MenuItem as="div" onClick={handleRemoveMe} isDisabled>
          Remove me from this Workspace
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

// NOTE: Use custom component instead of `Box` because of styling issue with positioning menu item
const MenuButtonAs = chakra('div', {
  baseStyle: {
    w: 'full',
  },
});
