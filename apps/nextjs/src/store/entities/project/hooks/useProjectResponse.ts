import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { uniqBy } from '@/shared/utils';
import {
  type ProjectTeammate,
  projectTeammateState,
} from '@/store/entities/projectTeammate';
import { type Teammate, useTeammateResponse } from '@/store/entities/teammate';
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
