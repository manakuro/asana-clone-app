import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import type { ProjectTaskResponse } from '@/graphql/types/projectTask';
import { uniqBy } from '@/shared/utils';
import { useProjectTaskResponse } from '@/store/entities/projectTask';
import { projectTaskSectionState } from '../atom';
import type { ProjectTaskSectionResponse } from '../type';

type Data = Override<Partial<ProjectTaskSectionResponse>, { id: string }>;

export const useProjectTaskSectionResponse = () => {
  const { setProjectTask } = useProjectTaskResponse();

  const setProjectsTaskSections = useAtomCallback(
    useCallback(
      (
        get,
        set,
        data: Data[],
        options?: { includeProjectTasks?: boolean; includeTask?: boolean },
      ) => {
        const includeProjectTasks = options?.includeProjectTasks ?? true;
        const includeTask = options?.includeTask ?? true;

        data.forEach((d) => {
          const prev = get(projectTaskSectionState(d.id));
          set(projectTaskSectionState(d.id), {
            ...prev,
            ...d,
          });
        });
        if (!includeProjectTasks) return;

        const projectTasks = data.reduce<ProjectTaskResponse[]>((acc, p) => {
          acc.push(...(p?.projectTasks || []));
          return acc;
        }, []);
        setProjectTask(uniqBy(projectTasks, 'id'), { includeTask });
      },
      [setProjectTask],
    ),
  );

  return {
    setProjectsTaskSections,
  };
};
