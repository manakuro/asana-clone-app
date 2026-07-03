import { memo, useCallback, useMemo } from 'react';
import { Menu } from '@/components/ui/menu';
import { Tooltip } from '@/components/ui/tooltip';
import { useDeleteTaskSectionModal } from '@/features/task/components/delete-task-section-modal/use-delete-task-section-modal';
import { useTasksListSectionContext } from '@/features/task/components/tasks-list/tasks-list-section/context';
import {
  useHasTasksByTaskSectionId,
  useTasksCanDeleteTaskSection,
  useTasksTaskSectionCommand,
} from '@/features/task/hooks';

export const MenuList = memo(function MenuList() {
  const { setModalState, onOpen } = useDeleteTaskSectionModal();
  const { deleteTaskSection } = useTasksTaskSectionCommand();
  const { onFocusInput, taskSectionId } = useTasksListSectionContext();
  const { hasTasks } = useHasTasksByTaskSectionId(taskSectionId);
  const { canDeleteTaskSection, message } =
    useTasksCanDeleteTaskSection(taskSectionId);

  const deleteSectionDisabled = useMemo(
    () => !canDeleteTaskSection,
    [canDeleteTaskSection],
  );

  const handleRenameSection = useCallback(() => {
    onFocusInput();
  }, [onFocusInput]);

  // TODO: Fix unmounted error
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
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item onClick={handleRenameSection} value="Rename section">
          Rename section
        </Menu.Item>
        {deleteSectionDisabled ? (
          <Tooltip
            showArrow
            content={message}
            aria-label={message}
            size="md"
            withIcon
          >
            <Menu.Item disabled value="Delete section">
              Delete section
            </Menu.Item>
          </Tooltip>
        ) : (
          <Menu.Item
            onClick={handleDeleteSection}
            color="alert"
            value="Delete section"
          >
            Delete section
          </Menu.Item>
        )}
      </Menu.Content>
    </Menu.Positioner>
  );
});
