import type React from 'react';
import { Popover } from '@/components/ui/Popover';
import { PortalManager } from '@/components/ui/PortalManager';

export const PopoverEditorLink: React.FCWithChildren = (props) => {
  return (
    <PortalManager zIndex={1500}>
      <Popover trigger="hover" isLazy placement="bottom-start" openDelay={500}>
        {props.children}
      </Popover>
    </PortalManager>
  );
};
