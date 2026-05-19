import type { PropsWithChildren } from 'react';
import { Link } from '@/components/ui/Link';
import { HoverCard } from '@/components/ui/Popover';
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
