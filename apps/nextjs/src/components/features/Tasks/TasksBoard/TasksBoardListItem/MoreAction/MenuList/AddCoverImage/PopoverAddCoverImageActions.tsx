import { FileUploader, type FileUploaderParams } from '@/components/ui/form';
import { Menu, type MenuRootProps } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { useMenuStyle } from '@/hooks';

type Props = {
  onUpload?: (files: FileUploaderParams) => void;
} & MenuRootProps;

export function PopoverAddCoverImageActions(props: Props) {
  const itemStyle = useMenuStyle().item;

  return (
    <Menu.Root lazyMount {...props}>
      <Menu.TriggerItem w="full">{props.children}</Menu.TriggerItem>
      <Portal>
        <Menu.Positioner>
          <Menu.Content pointerEvents="auto" mr="5px">
            <FileUploader
              css={itemStyle}
              id="attach-file-from-your-computer"
              onUpload={props.onUpload}
            >
              Your computer
            </FileUploader>
            <Menu.Item disabled value="Dropbox">
              Dropbox
            </Menu.Item>
            <Menu.Item disabled value="Google Drive">
              Google Drive
            </Menu.Item>
            <Menu.Item disabled value="Box">
              Box
            </Menu.Item>
            <Menu.Item disabled value="OneDrive/SharePoint">
              OneDrive/SharePoint
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
