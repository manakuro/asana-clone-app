import { atom } from 'jotai';
import { sortTeammateTaskSections } from '@/components/pages/my-tasks/index/store/my-tasks/filters';
import { isTaskListSortStatusState } from '@/components/pages/my-tasks/index/store/my-tasks/task-list-status';
import { tasksByTeammateIdState } from '@/features/teammate/store/teammate-task';
import { isTabStatusState } from '@/features/teammate/store/teammate-task-tab-status';
import { taskSectionsByTeammateIdState } from '@/features/teammate/store/teammates-task-section';

export const taskSectionIdsState = (teammateId: string) =>
  atom<string[]>((get) => {
    let teammateTaskSections = get(taskSectionsByTeammateIdState(teammateId));
    teammateTaskSections = sortTeammateTaskSections({ get })(
      teammateTaskSections,
    );

    switch (true) {
      case get(isTabStatusState('List')): {
        switch (true) {
          case get(isTaskListSortStatusState('dueDate')): {
            const tasks = get(tasksByTeammateIdState);
            const hasTaskWithNoDueDate = tasks.some((t) => !t.dueDate);
            if (!hasTaskWithNoDueDate) return [];

            return teammateTaskSections.map((t) => t.id);
          }
          case get(isTaskListSortStatusState('likes')):
          case get(isTaskListSortStatusState('alphabetical')): {
            return [];
          }
          default: {
            return teammateTaskSections.map((t) => t.id);
          }
        }
      }
      default: {
        return teammateTaskSections.map((t) => t.id);
      }
    }
  });
