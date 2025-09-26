import { ModalBody, ModalContent } from '@/components/ui/Modal';
import { useMenuStyle } from '@/hooks';
import { memo } from 'react';
import { MenuList } from './MenuList';
import { useEditorMentionMenu } from './useEditorMentionMenu';

export const MenuContent = memo(function MenuContent() {
  const { x, y, containerRef } = useEditorMentionMenu();
  const menuStyles = useMenuStyle().list;

  return (
    <ModalContent
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
      <ModalBody w="full" px={0} {...menuStyles}>
        <MenuList />
      </ModalBody>
    </ModalContent>
  );
});
