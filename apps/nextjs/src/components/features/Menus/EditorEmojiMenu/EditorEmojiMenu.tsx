import { Dialog } from '@/components/ui/Dialog';
import { Portal } from '@/components/ui/Portal';
import { MenuList } from './MenuList';
import { useEditorEmojiMenu } from './useEditorEmojiMenu';

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
        <Dialog.Backdrop />
        <Dialog.Positioner>{open && <MenuList />}</Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
