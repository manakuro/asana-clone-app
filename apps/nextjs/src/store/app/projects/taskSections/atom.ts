import { atom } from 'jotai';
import { sortProjectTaskSections } from '@/store/app/projects/filters';
import { tasksByProjectTaskSectionIdState } from '@/store/entities/projectTask';
import { projectTaskSectionsByProjectIdState } from '@/store/entities/projectTaskSection';
import { isTaskListSortStatusState } from '../taskListStatus';

export const projectsTaskSectionIdsState = (projectId: string) =>
  atom<string[]>((get) => {
    let projectTaskSections = get(
      projectTaskSectionsByProjectIdState(projectId),
    );
    projectTaskSections = sortProjectTaskSections({ get })(projectTaskSections);

    switch (true) {
      case get(isTaskListSortStatusState('dueDate')): {
        const hasTaskWithNoDueDate = !!projectTaskSections.filter(
          (taskSection) => {
            const tasks = get(tasksByProjectTaskSectionIdState(taskSection.id));
            return tasks.some((t) => !t.dueDate);
          },
        ).length;
        if (!hasTaskWithNoDueDate) return [];

        return projectTaskSections.map((t) => t.id);
      }
      case get(isTaskListSortStatusState('likes')):
      case get(isTaskListSortStatusState('alphabetical')): {
        return [];
      }
      default: {
        return projectTaskSections.map((t) => t.id);
      }
    }
  });
