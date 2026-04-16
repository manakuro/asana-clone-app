import type React from 'react';
import { Link } from '@/components/ui/Link';
import { HoverCard } from '@/components/ui/Popover';
import { useLinkStyle } from '@/hooks/styles';

export const PopoverEditorLinkTrigger: React.FCWithChildren = (props) => {
  const { style } = useLinkStyle();

  return (
    <HoverCard.Trigger asChild>
      <Link {...style}>{props.children}</Link>
    </HoverCard.Trigger>
  );
};
