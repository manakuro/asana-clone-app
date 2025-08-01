import { PortalManager } from '@/components/ui/atoms';
import { Popover } from '@/components/ui/organisms/Popover';
import type React from 'react';

export const PopoverEditorLink: React.FCWithChildren = (props) => {
  return (
    <PortalManager zIndex={1500}>
      <Popover trigger="hover" isLazy placement="bottom-start" openDelay={500}>
        {props.children}
      </Popover>
    </PortalManager>
  );
};
