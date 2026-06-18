import { memo } from 'react';
import {
  FileUploader,
  type FileUploaderParams,
} from '@/components/ui/form/file-uploader';
import { Menu } from '@/components/ui/menu';
import { useMenuStyle } from '@/hooks';

type Props = {
  onUpload?: (files: FileUploaderParams) => void;
  onClose?: () => void;
};

export const MenuList = memo(function MenuList(props: Props) {
  const itemStyle = useMenuStyle().item;

  return (
    <Menu.Positioner>
      <Menu.Content>
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
  );
});
