import { useMutation } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  UpdateProjectTeammateDocument,
  UpdateProjectTeammateOwnerDocument,
} from '@/graphql/hooks';
import { useWorkspace } from '@/store/entities/workspace';
import {
  ownerProjectTeammateByProjectIdState,
  projectTeammateByProjectIdAndTeammateIdState,
  projectTeammateState,
} from '../atom';
import type { ProjectTeammate } from '../type';
import { useProjectTeammateResponse } from './useProjectTeammateResponse';
import { useUpsert } from './useUpsert';

export const useProjectTeammatesCommand = () => {
  const { upsert } = useUpsert();
  const [updateProjectTeammateOwnerMutation] = useMutation(
    UpdateProjectTeammateOwnerDocument,
  );

  const [updateProjectTeammateMutation] = useMutation(
    UpdateProjectTeammateDocument,
  );

  const { workspace } = useWorkspace();
  const { setProjectsTeammates } = useProjectTeammateResponse();

  const setProjectTeammateById = useAtomCallback(
    useCallback(
      async (get, _set, input: Partial<ProjectTeammate> & { id: string }) => {
        const prev = get(projectTeammateState(input.id));

        const restore = () => {
          upsert(prev);
        };

        upsert({
          ...prev,
          ...input,
        });

        try {
          const res = await updateProjectTeammateMutation({
            variables: {
              input: {
                ...input,
                requestId: '',
                workspaceId: workspace.id,
              },
            },
          });
          if (res.error) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [updateProjectTeammateMutation, upsert, workspace.id],
    ),
  );

  const setProjectTeammateByProjectIdAndTeammateId = useAtomCallback(
    useCallback(
      async (
        get,
        _set,
        projectId: string,
        teammateId: string,
        input: Partial<ProjectTeammate>,
      ) => {
        const prev = get(
          projectTeammateByProjectIdAndTeammateIdState({
            projectId,
            teammateId,
          }),
        );
        upsert({
          ...prev,
          ...input,
        });
      },
      [upsert],
    ),
  );

  const setOwnerByProjectIdAndTeammateId = useAtomCallback(
    useCallback(
      async (get, _set, projectId: string, teammateId: string) => {
        const prev = get(ownerProjectTeammateByProjectIdState(projectId));
        if (prev.id) upsert({ ...prev, isOwner: false });

        const restore = () => {
          if (prev.id) upsert({ ...prev, isOwner: true });
        };

        const owner = get(
          projectTeammateByProjectIdAndTeammateIdState({
            projectId,
            teammateId,
          }),
        );
        if (owner.id) upsert({ ...owner, isOwner: true });

        try {
          const res = await updateProjectTeammateOwnerMutation({
            variables: {
              input: {
                teammateId,
                projectId,
                requestId: '',
                workspaceId: workspace.id,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }
          const data = res.data?.updateProjectTeammateOwner;
          if (!data) return;

          if (!owner.id) setProjectsTeammates([data]);
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        setProjectsTeammates,
        updateProjectTeammateOwnerMutation,
        upsert,
        workspace.id,
      ],
    ),
  );

  return {
    setProjectTeammateById,
    setProjectTeammateByProjectIdAndTeammateId,
    setOwnerByProjectIdAndTeammateId,
  };
};
