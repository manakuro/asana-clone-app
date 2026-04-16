import type React from 'react';
import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDisclosure } from '@/shared/chakra';
import { AddCoverImage } from './AddCoverImage';
import { CopyTask } from './CopyTask';
import { DeleteTask } from './DeleteTask';
import { DuplicateTask } from './DuplicateTask';
import { EditTaskName } from './EditTaskName';
import { MarkComplete } from './MarkComplete';
import { OpenInNewTab } from './OpenInNewTab';
import { ViewDetails } from './ViewDetails';

type Props = {
  onCloseMenu: () => void;
  taskId: string;
};
export const MenuList = memo(function MenuList(props: Props) {
  const { onCloseMenu } = props;
  const { open, onOpen, onClose } = useDisclosure();
  const { ref } = useClickOutside<HTMLDivElement>(() => {
    handleCloseAll();
  });

  const handleCloseAll = useCallback(() => {
    onClose();
    onCloseMenu();
  }, [onClose, onCloseMenu]);

  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLElement>) => e.stopPropagation(),
    [],
  );

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content ref={ref} zIndex={1} onClick={stopPropagation}>
          <EditTaskName onMouseEnter={onClose} onCloseMenu={onCloseMenu} />
          <AddCoverImage open={open} onOpen={onOpen} onClose={handleCloseAll} />
          <Menu.Separator />
          <MarkComplete
            taskId={props.taskId}
            onMouseEnter={onClose}
            onCloseMenu={onCloseMenu}
          />
          <ViewDetails
            taskId={props.taskId}
            onMouseEnter={onClose}
            onCloseMenu={onCloseMenu}
          />
          <OpenInNewTab
            taskId={props.taskId}
            onMouseEnter={onClose}
            onCloseMenu={onCloseMenu}
          />
          <Menu.Separator />
          <DuplicateTask
            taskId={props.taskId}
            onMouseEnter={onClose}
            onCloseMenu={onCloseMenu}
          />
          <CopyTask
            taskId={props.taskId}
            onMouseEnter={onClose}
            onCloseMenu={onCloseMenu}
          />
          <Menu.Separator />
          <DeleteTask taskId={props.taskId} onMouseEnter={onClose} />
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
});
