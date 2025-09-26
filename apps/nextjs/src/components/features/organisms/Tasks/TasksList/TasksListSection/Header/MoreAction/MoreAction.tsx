import { Menu, MenuButton } from '@/components/ui/Menu';
import { Box } from '@/components/ui/atoms/Box';
import { Icon } from '@/components/ui/atoms/Icon';
import { IconButton } from '@/components/ui/atoms/IconButton';
import { PortalManager } from '@/components/ui/atoms/PortalManager';
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
