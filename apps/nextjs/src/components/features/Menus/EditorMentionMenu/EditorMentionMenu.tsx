import { memo } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { Portal } from '@/components/ui/Portal';
import { MenuContent } from './MenuContent';
import { useEditorMentionMenu } from './useEditorMentionMenu';

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
      motionPreset="none"
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Positioner>{open && <MenuContent />}</Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});
