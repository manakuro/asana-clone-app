import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { useDeleteTaskSectionModal } from '@/features/tasks/components/delete-task-section-modal/use-delete-task-section-modal';
import {
  useHasTasksByTaskSectionId,
  useTasksTaskSectionCommand,
} from '@/features/tasks/hooks';
import { useTasksBoardListSectionContext } from '../../../context';

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
