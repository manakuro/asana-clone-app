import type { PropsWithChildren } from 'react';
import { Link } from '@/components/ui/link';
import { HoverCard } from '@/components/ui/popover';
import { useLinkStyle } from '@/hooks/styles';

export function PopoverEditorLinkTrigger(props: PropsWithChildren) {
  const { style } = useLinkStyle();

  return (
    <HoverCard.Trigger asChild>
      <Link as="span" {...style}>
        {props.children}
      </Link>
    </HoverCard.Trigger>
  );
}
