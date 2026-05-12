import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Menu } from '@/components/ui/Menu';
import { useDisclosure } from '@/shared/chakra';
import {
  useTasksBoardListItemContext,
  useTasksBoardListItemInputContext,
} from '../Provider';
import { MenuList } from './MenuList';

type Props = {
  taskId: string;
};

export const MoreAction = memo(function MoreAction(props: Props) {
  const { onClose, onOpen, open } = useDisclosure();
  const { isHovering } = useTasksBoardListItemContext();
  const { inputFocused } = useTasksBoardListItemInputContext();

  const show = useMemo<boolean>(() => {
    if (open) return true;
    if (inputFocused) return false;
    if (isHovering) return true;
    return false;
  }, [isHovering, open, inputFocused]);

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onOpen();
    },
    [onOpen],
  );

  return (
    <Menu.Root
      positioning={{ placement: 'bottom-start' }}
      closeOnSelect={false}
      open={open}
      lazyMount
    >
      <Flex position="absolute" top={2} right={2}>
        <Menu.Trigger asChild>
          <IconButton
            aria-label="More actions"
            size="sm"
            onClick={handleOpen}
            display={show ? 'flex' : 'none'}
          >
            <Icon icon="dotsHorizontalRounded" color="fg.muted" ml="1px" />
          </IconButton>
        </Menu.Trigger>
      </Flex>
      {open && <MenuList onCloseMenu={onClose} taskId={props.taskId} />}
    </Menu.Root>
  );
});
