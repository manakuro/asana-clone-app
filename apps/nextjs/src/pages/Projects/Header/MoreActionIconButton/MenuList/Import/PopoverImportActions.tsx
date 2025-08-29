import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  type MenuProps,
} from '@/components/ui/organisms/Menu';
import { chakra } from '@/shared/chakra';

type Props = {
  onClose: () => void;
} & MenuProps;

export function PopoverImportActions(props: Props) {
  return (
    <Menu isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" ml="5px">
        <MenuItem as="div" isDisabled>
          CSV
        </MenuItem>
        <MenuItem as="div" isDisabled>
          Email
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
