import { Link } from '@/components/ui/atoms';
import { PopoverTrigger } from '@/components/ui/organisms/Popover';
import { useLinkStyle } from '@/hooks/styles';
import type React from 'react';

export const PopoverEditorLinkTrigger: React.FCWithChildren = (props) => {
  const { style } = useLinkStyle();

  return (
    <PopoverTrigger>
      <Link {...style}>{props.children}</Link>
    </PopoverTrigger>
  );
};
