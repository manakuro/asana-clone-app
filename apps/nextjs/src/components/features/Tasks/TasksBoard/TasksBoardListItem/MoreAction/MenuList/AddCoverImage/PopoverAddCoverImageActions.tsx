import { FileUploader, type FileUploaderParams } from '@/components/ui/Form';
import { Menu, type MenuRootProps } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';
import { useMenuStyle } from '@/hooks';

type Props = {
  onUpload?: (files: FileUploaderParams) => void;
  onClose: () => void;
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
              onUploaded={props.onClose}
            >
              Your computer
            </FileUploader>
            <Menu.Item disabled value="">
              Dropbox
            </Menu.Item>
            <Menu.Item disabled value="">
              Google Drive
            </Menu.Item>
            <Menu.Item disabled value="">
              Box
            </Menu.Item>
            <Menu.Item disabled value="">
              OneDrive/SharePoint
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
