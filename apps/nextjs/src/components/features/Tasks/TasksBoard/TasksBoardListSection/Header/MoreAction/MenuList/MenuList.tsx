import { useDeleteTaskSectionModal } from '@/components/features/Modals';
import {
  useHasTasksByTaskSectionId,
  useTasksTaskSectionCommand,
} from '@/components/features/Tasks/hooks';
import { MenuList as AtomsMenuList, MenuItem } from '@/components/ui/Menu';
import { memo, useCallback } from 'react';
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
    <AtomsMenuList>
      <MenuItem onClick={handleRenameSection}>Rename section</MenuItem>
      <MenuItem onClick={handleDeleteSection} color="alert">
        Delete section
      </MenuItem>
    </AtomsMenuList>
  );
});
