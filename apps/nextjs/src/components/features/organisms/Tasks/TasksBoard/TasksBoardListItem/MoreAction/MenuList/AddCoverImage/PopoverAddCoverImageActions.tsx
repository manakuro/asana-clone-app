import {
  Box,
  FileUploader,
  type FileUploaderParams,
} from '@/components/ui/atoms';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  type MenuProps,
} from '@/components/ui/organisms/Menu';
import { useMenuStyle } from '@/hooks';
import { chakra } from '@/shared/chakra';

type Props = {
  onUpload?: (files: FileUploaderParams) => void;
  onClose: () => void;
} & MenuProps;

export function PopoverAddCoverImageActions(props: Props) {
  const itemStyle = useMenuStyle().item;

  return (
    <Menu isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" mr="5px">
        <FileUploader
          {...itemStyle}
          id="attach-file-from-your-computer"
          onUpload={props.onUpload}
          onUploaded={props.onClose}
        >
          Your computer
        </FileUploader>
        <MenuItem as={Box} isDisabled>
          Dropbox
        </MenuItem>
        <MenuItem as={Box} isDisabled>
          Google Drive
        </MenuItem>
        <MenuItem as={Box} isDisabled>
          Box
        </MenuItem>
        <MenuItem as={Box} isDisabled>
          OneDrive/SharePoint
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
