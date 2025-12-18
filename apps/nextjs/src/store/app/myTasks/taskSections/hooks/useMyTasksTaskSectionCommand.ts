import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useMe } from '@/store/entities/me';
import { useTeammatesTaskSectionCommand } from '@/store/entities/teammatesTaskSection';

export const useMyTasksTaskSectionCommand = () => {
  const { me } = useMe();
  const {
    addTeammatesTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteTeammateTaskSection,
    undeleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndDeleteTasks,
  } = useTeammatesTaskSectionCommand();

  const addTaskSection = useAtomCallback(
    useCallback(
      (_get, _set) => {
        return addTeammatesTaskSection({ teammateId: me.id });
      },
      [me.id, addTeammatesTaskSection],
    ),
  );

  return {
    addTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteTeammateTaskSection,
    undeleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndDeleteTasks,
  };
};
