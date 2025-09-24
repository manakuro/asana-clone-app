import { Menu, MenuButton } from '@/components/ui/Menu';
import { Icon } from '@/components/ui/atoms/Icon';
import { IconButton } from '@/components/ui/atoms/IconButton';
import { PortalManager } from '@/components/ui/atoms/PortalManager';
import { memo } from 'react';
import { MenuList } from './MenuList';

export const MoreActionButton = memo(function MoreActionButton() {
  return (
    <PortalManager zIndex={1500}>
      <Menu placement="bottom-start" isLazy>
        <MenuButton
          aria-label="More actions"
          as={IconButton}
          icon={<Icon icon="dotsHorizontalRounded" color="text.muted" />}
          variant="ghost"
          size="sm"
          h="28px"
        />
        <MenuList />
      </Menu>
    </PortalManager>
  );
});
