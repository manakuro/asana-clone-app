import type React from 'react';
import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
import { useClickableHoverStyle } from '@/hooks';
import { useDisclosure } from '@/shared/chakra';
import { MenuList } from './MenuList';

type Props = {
  workspaceId: string;
};

export const WorkspaceMenu = memo(function WorkspaceMenu(props: Props) {
  const { workspaceId } = props;
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const { onClose, onOpen, open } = useDisclosure();

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      e.preventDefault();

      onOpen();
    },
    [onOpen],
  );

  return (
    <Menu.Root
      positioning={{ placement: 'bottom-start' }}
      lazyMount
      open={open}
    >
      <Menu.Trigger asChild>
        <Icon
          icon="dotsHorizontalRounded"
          color="white"
          {...clickableHoverLightStyle}
          onClick={handleClick}
        />
      </Menu.Trigger>
      {open && <MenuList onClose={onClose} workspaceId={workspaceId} />}
    </Menu.Root>
  );
});
