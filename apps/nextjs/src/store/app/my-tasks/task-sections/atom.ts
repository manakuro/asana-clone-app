import { atom } from 'jotai';
import { sortTeammateTaskSections } from '@/store/app/my-tasks/filters';
import { isTaskListSortStatusState } from '@/store/app/my-tasks/task-list-status';
import { taskSectionsByTeammateIdState } from '@/store/entities/teammatesTaskSection';
import { tasksByTeammateIdState } from '@/store/entities/teammateTask';
import { isTabStatusState } from '@/store/entities/teammateTaskTabStatus';

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
