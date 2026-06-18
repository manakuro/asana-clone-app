import { memo, useCallback } from 'react';
import { useDeleteTaskSectionModal } from '@/components/features/Modals';
import {
  useHasTasksByTaskSectionId,
  useTasksTaskSectionCommand,
} from '@/components/features/Tasks/hooks';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { useTasksBoardListSectionContext } from '../../../Provider';

export const MenuList = memo(function MenuList() {
  const { setModalState, onOpen } = useDeleteTaskSectionModal();
  const { deleteTaskSection } = useTasksTaskSectionCommand();
  const { onFocusInput, taskSectionId } = useTasksBoardListSectionContext();
  const { hasTasks } = useHasTasksByTaskSectionId(taskSectionId);

  const handleRenameSection = useCallback(() => {
    onFocusInput();
  }, [onFocusInput]);

  const handleDeleteSection = useCallback(async () => {
    if (!hasTasks) {
      await deleteTaskSection(taskSectionId);
      return;
    }

    setModalState({
      taskSectionId,
    });
    onOpen();
  }, [deleteTaskSection, hasTasks, onOpen, setModalState, taskSectionId]);

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item onClick={handleRenameSection} value="Rename section">
            Rename section
          </Menu.Item>
          <Menu.Item
            onClick={handleDeleteSection}
            color="alert"
            value="Delete section"
          >
            Delete section
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
});
