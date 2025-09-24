import { Modal } from '@/components/ui/Modal';
import { memo } from 'react';
import { MenuContent } from './MenuContent';
import { useEditorMentionMenu } from './useEditorMentionMenu';

export const EditorMentionMenu = memo(function EditorMentionMenu() {
  const { isOpen, onClose } = useEditorMentionMenu();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xs"
      autoFocus={false}
      trapFocus={false}
      motionPreset="none"
    >
      {isOpen && <MenuContent />}
    </Modal>
  );
});
