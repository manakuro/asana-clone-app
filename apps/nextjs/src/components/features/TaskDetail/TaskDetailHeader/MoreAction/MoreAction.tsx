import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Menu, MenuButton } from '@/components/ui/Menu';
import { PortalManager } from '@/components/ui/PortalManager';
import { Tooltip } from '@/components/ui/Tooltip';
import { useDisclosure } from '@/shared/chakra';
import { memo, useCallback } from 'react';
import { MenuList } from './MenuList';

type Props = {
  taskId: string;
};

export const MoreAction = memo(function MoreAction(props: Props) {
  const { onClose, onOpen, isOpen } = useDisclosure();

  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <PortalManager zIndex={1500}>
      <Menu
        placement="bottom-end"
        closeOnBlur={false}
        closeOnSelect={false}
        isOpen={isOpen}
        isLazy
      >
        <Tooltip
          hasArrow
          label="More actions"
          aria-label="More actions button"
          size="sm"
          withIcon
        >
          <MenuButton
            aria-label="More actions"
            as={IconButton}
            icon={<Icon icon="dotsHorizontalRounded" color="text.muted" />}
            variant="ghost"
            size="sm"
            onClick={handleOpen}
          />
        </Tooltip>
        {isOpen && <MenuList onCloseMenu={onClose} taskId={props.taskId} />}
      </Menu>
    </PortalManager>
  );
});
