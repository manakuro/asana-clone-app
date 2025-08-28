import { Icon, PortalManager } from '@/components/ui/atoms';
import { Menu, MenuButton } from '@/components/ui/organisms/Menu';
import { useClickableHoverStyle } from '@/hooks';
import { useDisclosure } from '@/shared/chakra';
import type React from 'react';
import { memo, useCallback } from 'react';
import { MenuList } from './MenuList';

type Props = {
  projectId: string;
};

export const ProjectMenu = memo(function ProjectMenu(props: Props) {
  const { projectId } = props;
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
        {isOpen && <MenuList onClose={onClose} projectId={projectId} />}
      </Menu>
    </PortalManager>
  );
});
