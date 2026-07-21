import dynamic from 'next/dynamic';
import { Dialog } from '@/components/ui/dialog';
import { Portal } from '@/components/ui/portal';
import { useEditorEmojiMenu } from './use-editor-emoji-menu';

const LazyMenuList = dynamic(
  () => import('./menu-list').then((mod) => mod.MenuList),
  { ssr: false },
);

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
        <Dialog.Positioner>{open && <LazyMenuList />}</Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
