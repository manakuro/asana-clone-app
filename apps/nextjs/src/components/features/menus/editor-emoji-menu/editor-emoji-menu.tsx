import { Dialog } from '@/components/ui/dialog';
import { Portal } from '@/components/ui/portal';
import { MenuList } from './menu-list';
import { useEditorEmojiMenu } from './use-editor-emoji-menu';

export function EditorEmojiMenu() {
  const { open, onClose } = useEditorEmojiMenu();

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
        }
      }}
      size="xs"
      trapFocus={false}
      motionPreset="none"
    >
      <Portal>
        <Dialog.Positioner>{open && <MenuList />}</Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
