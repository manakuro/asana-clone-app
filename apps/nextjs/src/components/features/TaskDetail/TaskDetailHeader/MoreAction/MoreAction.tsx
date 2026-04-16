import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Menu } from '@/components/ui/Menu';
import { Tooltip } from '@/components/ui/Tooltip';
import { useDisclosure } from '@/shared/chakra';
import { MenuList } from './MenuList';

type Props = {
  taskId: string;
};

export const MoreAction = memo(function MoreAction(props: Props) {
  const { onClose, onOpen, open } = useDisclosure();

  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Menu.Root
      positioning={{ placement: 'bottom-end' }}
      closeOnSelect={false}
      open={open}
      lazyMount
    >
      <Tooltip
        showArrow
        content="More actions"
        aria-label="More actions button"
        size="sm"
        withIcon
      >
        <Menu.Trigger asChild>
          <IconButton
            aria-label="More actions"
            variant="ghost"
            size="sm"
            onClick={handleOpen}
          >
            <Icon icon="dotsHorizontalRounded" color="text.muted" />
          </IconButton>
        </Menu.Trigger>
      </Tooltip>
      {open && <MenuList onCloseMenu={onClose} taskId={props.taskId} />}
    </Menu.Root>
  );
});
