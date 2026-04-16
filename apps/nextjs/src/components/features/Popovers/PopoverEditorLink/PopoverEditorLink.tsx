import type React from 'react';
import { HoverCard } from '@/components/ui/Popover';

export const PopoverEditorLink: React.FCWithChildren = (props) => {
  return (
    <HoverCard.Root
      lazyMount
      positioning={{ placement: 'bottom-start' }}
      openDelay={500}
    >
      {props.children}
    </HoverCard.Root>
  );
};
