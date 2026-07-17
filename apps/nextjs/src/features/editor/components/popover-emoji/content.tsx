import { memo, useCallback } from 'react';
import { Box } from '@/components/ui/box';
import { Popover } from '@/components/ui/popover';
import { Portal } from '@/components/ui/portal';
import { useClickOutside } from '@/hooks/use-click-outside';
import { EmojiPicker, type SelectedEmoji } from '@/lib/emoji';
import { usePopoverEmojiContext } from './context';

export const Content = memo(function Content() {
  const { onClose } = usePopoverEmojiContext();
  const { ref } = useClickOutside<HTMLDivElement>(onClose);

  const handleSelect = useCallback(
    (emoji: SelectedEmoji) => {
      onClose(emoji);
    },
    [onClose],
  );

  return (
    <Portal>
      <Popover.Positioner>
        <Box zIndex="popover" w="full" h="full" ref={ref}>
          <Popover.Content boxShadow="none" border="none" w="auto">
            <EmojiPicker onEmojiSelect={handleSelect} />
          </Popover.Content>
        </Box>
      </Popover.Positioner>
    </Portal>
  );
});
