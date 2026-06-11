import { type KeyboardEvent, useCallback } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { useMenuStyle } from '@/hooks';
import type { BaseEmoji } from '@/shared/emoji';
import { EmojiItem } from './EmojiItem';
import { useEditorEmojiMenu } from './useEditorEmojiMenu';

export function MenuList() {
  const {
    emojis,
    x,
    y,
    setValue,
    containerRef,
    onArrowDown,
    onArrowUp,
    onEnter,
  } = useEditorEmojiMenu();
  const menuStyles = useMenuStyle();

  const handleClick = useCallback(
    (val: BaseEmoji) => {
      setValue(val);
    },
    [setValue],
  );

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
      <Dialog.Body w="full" px={0} css={menuStyles.content}>
        {emojis.map((e, i) => (
          <EmojiItem onClick={handleClick} emoji={e} key={e.id} index={i} />
        ))}
      </Dialog.Body>
    </Dialog.Content>
  );
}
