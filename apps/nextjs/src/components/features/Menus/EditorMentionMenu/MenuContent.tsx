import { memo } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { useMenuStyle } from '@/hooks';
import { MenuList } from './MenuList';
import { useEditorMentionMenu } from './useEditorMentionMenu';

export const MenuContent = memo(function MenuContent() {
  const { x, y, containerRef } = useEditorMentionMenu();
  const menuStyles = useMenuStyle().content;

  return (
    <Dialog.Content
      position="fixed"
      top={y}
      left={x}
      mb={0}
      mt={0}
      maxW="450px"
      maxH={56}
      overflowY="scroll"
      ref={containerRef}
    >
      <Dialog.Body w="full" px={0} css={menuStyles}>
        <MenuList />
      </Dialog.Body>
    </Dialog.Content>
  );
});
