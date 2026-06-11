import { type KeyboardEvent, memo, useCallback } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { useMenuStyle } from '@/hooks';
import { MenuList } from './MenuList';
import { useEditorMentionMenu } from './useEditorMentionMenu';

export const MenuContent = memo(function MenuContent() {
  const { x, y, containerRef, onArrowDown, onArrowUp, onEnter } =
    useEditorMentionMenu();
  const menuStyles = useMenuStyle().content;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          onArrowDown();
          break;
        case 'ArrowUp':
          e.preventDefault();
          onArrowUp();
          break;
        case 'Enter':
          e.preventDefault();
          onEnter();
          break;
      }
    },
    [onArrowDown, onArrowUp, onEnter],
  );

  return (
    <Dialog.Content
      position="fixed"
      top={y}
      left={x}
      mb={0}
      mt={0}
      maxW="450px"
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <Dialog.Body w="full" px={0} css={menuStyles}>
        <MenuList />
      </Dialog.Body>
    </Dialog.Content>
  );
});
