import { Popover, type PopoverProps } from '@/components/ui/Popover';
import { PortalManager } from '@/components/ui/PortalManager';
import { memo } from 'react';

type Props = PopoverProps;

export const SearchMenu = memo(function SearchMenu(props: Props) {
  return (
    <PortalManager zIndex={1500}>
      <Popover
        closeOnBlur={false}
        autoFocus={false}
        returnFocusOnClose={false}
        isLazy
        lazyBehavior="keepMounted"
        {...props}
      />
    </PortalManager>
  );
});
