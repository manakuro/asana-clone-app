import {
  FileUploader,
  type FileUploaderParams,
  Portal,
} from '@/components/ui/atoms';
import {
  MenuGroup,
  MenuItem,
  MenuList as OrganismsMenuList,
} from '@/components/ui/organisms/Menu';
import { useClickOutside, useMenuStyle } from '@/hooks';
import type React from 'react';
import { memo } from 'react';

type Props = {
  onUpload?: (files: FileUploaderParams) => void;
  onClose?: () => void;
};

export const MenuList: React.FC<Props> = memo((props) => {
  const itemStyle = useMenuStyle().item;
  const { ref } = useClickOutside<HTMLDivElement>(() => {
    props.onClose?.();
  });

  return (
    <Portal>
      <OrganismsMenuList ref={ref}>
        <MenuGroup title="Attach a File">
          <FileUploader
            {...itemStyle}
            id="attach-file-from-your-computer"
            onUpload={props.onUpload}
            onUploaded={props.onClose}
          >
            Your computer
          </FileUploader>
          <MenuItem isDisabled>Dropbox</MenuItem>
          <MenuItem isDisabled>Google Drive</MenuItem>
          <MenuItem isDisabled>Box</MenuItem>
          <MenuItem isDisabled>OneDrive/SharePoint</MenuItem>
        </MenuGroup>
      </OrganismsMenuList>
    </Portal>
  );
});
MenuList.displayName = 'MenuList';
