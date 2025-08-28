import { Box, Portal } from '@/components/ui/atoms';
import { PopoverContent } from '@/components/ui/organisms/Popover';
import { useClickOutside } from '@/hooks';
import { type BaseEmoji, EmojiPicker } from '@/shared/emoji';
import { memo, useCallback } from 'react';
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
      <Box zIndex="popover" w="full" h="full" ref={ref}>
        <PopoverContent boxShadow="none" border="none" w="auto">
          <EmojiPicker onSelect={handleSelect} title="manato" />
        </PopoverContent>
      </Box>
    </Portal>
  );
});
