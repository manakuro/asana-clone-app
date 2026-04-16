import { memo } from 'react';
import {
  FileUploader,
  type FileUploaderParams,
} from '@/components/ui/Form/FileUploader';
import { Menu } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';
import { useClickOutside, useMenuStyle } from '@/hooks';

type Props = {
  onUpload?: (files: FileUploaderParams) => void;
  onClose?: () => void;
};

export const MenuList = memo(function MenuList(props: Props) {
  const itemStyle = useMenuStyle().item;
  const { ref } = useClickOutside<HTMLDivElement>(() => {
    props.onClose?.();
  });

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content ref={ref}>
          <Menu.ItemGroup title="Attach a File">
            <FileUploader
              css={itemStyle}
              id="attach-file-from-your-computer"
              onUpload={props.onUpload}
              onUploaded={props.onClose}
            >
              Your computer
            </FileUploader>
            <Menu.Item disabled value="0">
              Dropbox
            </Menu.Item>
            <Menu.Item disabled value="1">
              Google Drive
            </Menu.Item>
            <Menu.Item disabled value="2">
              Box
            </Menu.Item>
            <Menu.Item disabled value="3">
              OneDrive/SharePoint
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
});
