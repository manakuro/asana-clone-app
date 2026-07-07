import { atom } from 'jotai';
import { projectTaskByTaskIdState } from '@/features/project/store/project-task';
import { createState } from '@/lib/jotai';
import type { ProjectTaskSection } from './type';

export const DEFAULT_TITLE_NAME = 'Untitled Section';

export const initialState = (): ProjectTaskSection => ({
  id: '',
  name: '',
  projectId: '',
  isNew: false,
  createdAt: '',
  updatedAt: '',
});

export const {
  state: projectTaskSectionState,
  listState: projectTaskSectionsState,
} = createState({ initialState });

export const projectTaskSectionsByProjectIdState = (projectId: string) =>
  atom<ProjectTaskSection[]>((get) => {
    const projectsTaskSections = get(projectTaskSectionsState);
    return projectsTaskSections.filter((t) => t.projectId === projectId);
  });

export const projectTaskSectionByTaskIdAndProjectIdState = ({
  taskId,
  projectId,
}: {
  taskId: string;
  projectId: string;
}) =>
  atom<ProjectTaskSection>((get) => {
    const projectTask = get(projectTaskByTaskIdState(taskId));
    const projectsTaskSections = get(projectTaskSectionsState);
    return (
      projectsTaskSections
        .filter((p) => p.projectId === projectId)
        .find((p) => p.id === projectTask.projectTaskSectionId) ||
      initialState()
    );
  });
