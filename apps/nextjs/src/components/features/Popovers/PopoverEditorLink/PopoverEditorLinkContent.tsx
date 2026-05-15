import type React from 'react';
import { Flex } from '@/components/ui/Flex';
import { HoverCard } from '@/components/ui/Popover';
import { Portal } from '@/components/ui/Portal';

export const PopoverEditorLinkContent: React.FCWithChildren = (props) => {
  return (
    <Portal>
      <HoverCard.Positioner>
        <HoverCard.Content contentEditable={false} px={4} py={3}>
          <Flex fontSize="sm" alignItems="center" userSelect="none">
            {props.children}
          </Flex>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Portal>
  );
};
