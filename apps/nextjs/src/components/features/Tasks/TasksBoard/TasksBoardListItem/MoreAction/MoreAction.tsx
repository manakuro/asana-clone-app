import { memo, useMemo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Menu } from '@/components/ui/menu';
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

  return (
    <Menu.Root
      positioning={{ placement: 'bottom-start' }}
      open={open}
      onOpenChange={(e) => {
        if (e.open) {
          onOpen();
        } else {
          onClose();
        }
      }}
      lazyMount
    >
      <Flex position="absolute" top={2} right={2}>
        <Menu.Trigger asChild>
          <IconButton
            aria-label="More actions"
            variant="ghost"
            size="sm"
            display={show ? 'flex' : 'none'}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon icon="dotsHorizontalRounded" color="fg.muted" ml="1px" />
          </IconButton>
        </Menu.Trigger>
      </Flex>
      <MenuList taskId={props.taskId} />
    </Menu.Root>
  );
});
