import { Icon, PortalManager } from '@/components/ui/atoms';
import { Menu, MenuButton } from '@/components/ui/organisms/Menu';
import { useClickableHoverStyle } from '@/hooks';
import { useDisclosure } from '@/shared/chakra';
import type React from 'react';
import { memo, useCallback } from 'react';
import { MenuList } from './MenuList';

type Props = {
  workspaceId: string;
};

export const WorkspaceMenu = memo(function WorkspaceMenu(props: Props) {
  const { workspaceId } = props;
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const { onClose, onOpen, isOpen } = useDisclosure();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      e.preventDefault();

      onOpen();
    },
    [onOpen],
  );

  return (
    <PortalManager zIndex={1500}>
      <Menu placement="bottom-start" isLazy isOpen={isOpen}>
        <MenuButton {...clickableHoverLightStyle} onClick={handleClick}>
          <Icon icon="dotsHorizontalRounded" color="white" />
        </MenuButton>
        {isOpen && <MenuList onClose={onClose} workspaceId={workspaceId} />}
      </Menu>
    </PortalManager>
  );
});
