import { PortalManager } from '@/components/ui/atoms';
import { Popover, type PopoverProps } from '@/components/ui/organisms/Popover';
import { memo } from 'react';

type Props = PopoverProps;

export const ProjectTeammateMenu = memo(function ProjectTeammateMenu(
  props: Props,
) {
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
