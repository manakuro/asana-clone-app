import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  type ProjectTeammate,
  projectTeammateState,
} from '@/features/project/store/project-teammate';
import {
  type Teammate,
  useTeammateResponse,
} from '@/features/teammate/store/teammate';
import { uniqBy } from '@/utils';
import { projectState } from '../atom';
import type { ProjectResponse } from '../type';

export const useProjectResponse = () => {
  const { setTeammates: setTeammatesFromResponse } = useTeammateResponse();

  const setProjectTeammates = useAtomCallback(
    useCallback((_, set, data: ProjectResponse[]) => {
      const projectTeammates = data.reduce<ProjectTeammate[]>((acc, p) => {
        acc.push(...p.projectTeammates);
        return uniqBy(acc, 'id');
      }, []);

      projectTeammates.forEach((p) => {
        set(projectTeammateState(p.id), p);
      });
    }, []),
  );

  const setTeammates = useAtomCallback(
    useCallback(
      (_, __, data: ProjectResponse[]) => {
        const teammates = data.reduce<Teammate[]>((acc, p) => {
          acc.push(...p.projectTeammates.map((pt) => pt.teammate));
          return uniqBy(acc, 'id');
        }, []);

        setTeammatesFromResponse(teammates);
      },
      [setTeammatesFromResponse],
    ),
  );

  const setProjects = useAtomCallback(
    useCallback(
      (_get, set, data: ProjectResponse[]) => {
        data.forEach((p) => {
          set(projectState(p.id), p);
        });

        setProjectTeammates(data);
        setTeammates(data);
      },
      [setProjectTeammates, setTeammates],
    ),
  );

  return {
    setProjects,
  };
};
