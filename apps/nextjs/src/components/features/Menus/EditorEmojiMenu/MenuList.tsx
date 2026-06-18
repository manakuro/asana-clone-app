import { useCallback } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { useMenuStyle } from '@/hooks';
import type { BaseEmoji } from '@/shared/emoji';
import { EmojiItem } from './EmojiItem';
import { useEditorEmojiMenu } from './useEditorEmojiMenu';

export function MenuList() {
  const { emojis, x, y, setValue, containerRef } = useEditorEmojiMenu();
  const menuStyles = useMenuStyle();

  const handleClick = useCallback(
    (val: BaseEmoji) => {
      setValue(val);
    },
    [setValue],
  );

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
      <Dialog.Body w="full" px={0} css={menuStyles.content}>
        {emojis.map((e, i) => (
          <EmojiItem onClick={handleClick} emoji={e} key={e.id} index={i} />
        ))}
      </Dialog.Body>
    </Dialog.Content>
  );
}
