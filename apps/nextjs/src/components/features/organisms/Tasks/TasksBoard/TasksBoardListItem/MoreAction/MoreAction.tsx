import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { Flex, Icon, IconButton, PortalManager } from 'src/components/ui/atoms';
import { Menu, MenuButton } from 'src/components/ui/organisms/Menu';
import { useDisclosure } from 'src/shared/chakra';
import {
  useTasksBoardListItemContext,
  useTasksBoardListItemInputContext,
} from '../Provider';
import { MenuList } from './MenuList';

type Props = {
  taskId: string;
};

export const MoreAction: React.FC<Props> = memo<Props>((props) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { isHovering } = useTasksBoardListItemContext();
  const { inputFocused } = useTasksBoardListItemInputContext();

  const show = useMemo<boolean>(() => {
    if (isOpen) return true;
    if (inputFocused) return false;
    if (isHovering) return true;
    return false;
  }, [isHovering, isOpen, inputFocused]);

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onOpen();
    },
    [onOpen],
  );

  return (
    <PortalManager zIndex={1500}>
      <Menu
        placement="bottom-start"
        closeOnBlur={false}
        closeOnSelect={false}
        isOpen={isOpen}
        isLazy
      >
        <Flex position="absolute" top={2} right={2}>
          <MenuButton
            aria-label="More actions"
            as={IconButton}
            icon={
              <Icon icon="dotsHorizontalRounded" color="text.muted" ml="1px" />
            }
            size="sm"
            onClick={handleOpen}
            display={show ? 'flex' : 'none'}
          />
        </Flex>
        {isOpen && <MenuList onCloseMenu={onClose} taskId={props.taskId} />}
      </Menu>
    </PortalManager>
  );
});
MoreAction.displayName = 'MoreAction';
