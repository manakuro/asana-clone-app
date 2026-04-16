import { memo, useCallback } from 'react';
import { Box } from '@/components/ui/Box';
import { Popover } from '@/components/ui/Popover';
import { Portal } from '@/components/ui/Portal';
import { useClickOutside } from '@/hooks';
import { type BaseEmoji, EmojiPicker } from '@/shared/emoji';
import { usePopoverEmojiContext } from './Provider';

import 'emoji-mart/css/emoji-mart.css';

export const Content = memo(function Content() {
  const { onClose } = usePopoverEmojiContext();
  const { ref } = useClickOutside<HTMLDivElement>(onClose);

  const handleSelect = useCallback(
    (emoji: BaseEmoji) => {
      onClose(emoji);
    },
    [onClose],
  );

  return (
    <Portal>
      <Popover.Positioner>
        <Box zIndex="popover" w="full" h="full" ref={ref}>
          <Popover.Content boxShadow="none" border="none" w="auto">
            <EmojiPicker onSelect={handleSelect} title="manato" />
          </Popover.Content>
        </Box>
      </Popover.Positioner>
    </Portal>
  );
});
