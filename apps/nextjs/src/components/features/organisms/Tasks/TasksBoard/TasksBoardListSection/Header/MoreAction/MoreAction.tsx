import { Box } from '@/components/ui/Box';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Menu, MenuButton } from '@/components/ui/Menu';
import { PortalManager } from '@/components/ui/PortalManager';
import { memo } from 'react';
import { MenuList } from './MenuList';

export const MoreAction = memo(function MoreAction() {
  return (
    <PortalManager zIndex={1500}>
      <Box>
        <Menu placement="bottom-start" isLazy>
          <MenuButton
            aria-label="More actions"
            as={IconButton}
            icon={<Icon icon="dotsHorizontalRounded" color="text.muted" />}
            variant="ghost"
            size="sm"
          />
          <MenuList />
        </Menu>
      </Box>
    </PortalManager>
  );
});
