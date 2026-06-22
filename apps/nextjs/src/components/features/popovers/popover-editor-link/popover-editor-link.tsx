import type { PropsWithChildren } from 'react';

import { HoverCard } from '@/components/ui/popover';

export function PopoverEditorLink(props: PropsWithChildren) {
  return (
    <HoverCard.Root
      lazyMount
      positioning={{ placement: 'bottom-start' }}
      openDelay={500}
    >
      {props.children}
    </HoverCard.Root>
  );
}
