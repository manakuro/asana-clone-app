import { atom } from 'jotai';
import { sortTeammateTaskSections } from '@/components/pages/my-tasks/store/my-tasks/filters';
import { isTaskListSortStatusState } from '@/components/pages/my-tasks/store/my-tasks/task-list-status';
import { tasksByTeammateIdState } from '@/store/entities/teammate-task';
import { isTabStatusState } from '@/store/entities/teammate-task-tab-status';
import { taskSectionsByTeammateIdState } from '@/store/entities/teammates-task-section';

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
