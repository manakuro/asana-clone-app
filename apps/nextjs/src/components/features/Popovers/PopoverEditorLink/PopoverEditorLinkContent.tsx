import type { PropsWithChildren } from 'react';
import { Flex } from '@/components/ui/flex';
import { HoverCard } from '@/components/ui/popover';

export function PopoverEditorLinkContent(props: PropsWithChildren) {
  return (
    <HoverCard.Positioner>
      <HoverCard.Content contentEditable={false} px={4} py={3}>
        <Flex fontSize="sm" alignItems="center" userSelect="none">
          {props.children}
        </Flex>
      </HoverCard.Content>
    </HoverCard.Positioner>
  );
}
