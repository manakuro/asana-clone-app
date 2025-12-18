import type React from 'react';
import { Link } from '@/components/ui/Link';
import { PopoverTrigger } from '@/components/ui/Popover';
import { useLinkStyle } from '@/hooks/styles';

export const PopoverEditorLinkTrigger: React.FCWithChildren = (props) => {
  const { style } = useLinkStyle();

  return (
    <PopoverTrigger>
      <Link {...style}>{props.children}</Link>
    </PopoverTrigger>
  );
};
