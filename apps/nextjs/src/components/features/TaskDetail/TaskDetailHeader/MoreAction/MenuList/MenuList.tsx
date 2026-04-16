import { useCallback } from 'react';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';
import { Text } from '@/components/ui/Text';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDisclosure } from '@/shared/chakra';
import { AddToAnotherProject } from './AddToAnotherProject';
import { DeleteTask } from './DeleteTask';
import { PopoverAdvancedActions } from './PopoverAdvancedActions';
import { Print } from './Print';

type Props = {
  onCloseMenu: () => void;
  taskId: string;
};

export function MenuList(props: Props) {
  const { open, onOpen, onClose } = useDisclosure();
  const { ref } = useClickOutside<HTMLDivElement>(() => {
    handleCloseAll();
  });

  const _handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleCloseAll = useCallback(() => {
    onClose();
    props.onCloseMenu();
  }, [onClose, props]);

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content ref={ref} zIndex={1}>
          <Menu.Item onMouseEnter={handleClose} disabled value="">
            <Icon icon="fullscreenOutline" color="text.muted" />
            Full screen
            <Menu.ItemCommand>Tab+X</Menu.ItemCommand>
          </Menu.Item>
          <AddToAnotherProject
            onMouseEnter={handleClose}
            taskId={props.taskId}
            onClose={handleCloseAll}
          />
          <Menu.Item onMouseEnter={handleClose} disabled value="">
            <Icon icon="squareRounded" color="text.muted" />
            Mark as Milestone
          </Menu.Item>
          <Menu.Item onMouseEnter={handleClose} disabled value="">
            <Icon icon="beenHere" color="text.muted" />
            Mark as Approval
          </Menu.Item>
          <Menu.Item onMouseEnter={handleClose} disabled value="">
            <Icon icon="gitPullRequest" color="text.muted" />
            Make dependent
          </Menu.Item>
          <Menu.Item onMouseEnter={handleClose} disabled value="">
            <Icon icon="tag" color="text.muted" />
            Add tags
            <Menu.ItemCommand>Tab+T</Menu.ItemCommand>
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item onMouseEnter={handleClose} disabled value="">
            Duplicate task
          </Menu.Item>
          <Menu.Item onMouseEnter={handleClose} disabled value="">
            Create follow-up task
            <Menu.ItemCommand>⌘+Tab+N</Menu.ItemCommand>
          </Menu.Item>
          <Print
            onMouseEnter={handleClose}
            taskId={props.taskId}
            onClose={handleCloseAll}
          />
          <PopoverAdvancedActions
            open={open}
            positioning={{ placement: 'left' }}
            onClose={handleCloseAll}
          >
            <Flex flex={1}>
              <Text fontSize="sm" flex={1}>
                Advanced actions
              </Text>
              <Icon icon="chevronRight" />
            </Flex>
          </PopoverAdvancedActions>
          <Menu.Separator />
          <DeleteTask
            onMouseEnter={handleClose}
            taskId={props.taskId}
            onClose={handleCloseAll}
          />
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
}
