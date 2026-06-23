import { memo } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Portal } from '@/components/ui/portal';
import { MenuContent } from './menu-content';
import { useEditorMentionMenu } from './use-editor-mention-menu';

export const EditorMentionMenu = memo(function EditorMentionMenu() {
  const { open, onClose } = useEditorMentionMenu();

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
        <Dialog.Positioner>{open && <MenuContent />}</Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});
