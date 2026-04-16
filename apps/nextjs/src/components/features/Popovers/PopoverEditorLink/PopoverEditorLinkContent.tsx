import type React from 'react';
import { Flex } from '@/components/ui/Flex';
import { HoverCard } from '@/components/ui/Popover';
import { Portal } from '@/components/ui/Portal';

export const PopoverEditorLinkContent: React.FCWithChildren = (props) => {
  return (
    <Portal>
      <HoverCard.Positioner>
        <HoverCard.Content contentEditable={false}>
          <Flex boxShadow="md" borderRadius="md">
            <Flex fontSize="sm" alignItems="center" userSelect="none">
              {props.children}
            </Flex>
          </Flex>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Portal>
  );
};
