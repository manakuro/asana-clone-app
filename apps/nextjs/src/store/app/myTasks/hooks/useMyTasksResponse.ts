import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type TeammateTaskSectionResponse,
  useTeammatesTaskSectionResponse,
} from '@/store/entities/teammatesTaskSection';
import {
  type TeammateTaskColumnResponse,
  useTeammateTaskColumnResponse,
} from '@/store/entities/teammateTaskColumn';
import { taskListStatusState } from '../taskListStatus';
import type {
  MyTasksResponse,
  MyTasksTeammateTaskSectionResponse,
} from '../type';

export const useMyTasksResponse = () => {
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse();
  const { setTaskColumns, setTaskStatus } = useSetters();
  const setMyTasks = useAtomCallback(
    useCallback(
      (_get, _set, data: MyTasksResponse) => {
        const teammateTaskSections = getNodesFromEdges<
          MyTasksTeammateTaskSectionResponse,
          MyTasksResponse['teammateTaskSections']
        >(data.teammateTaskSections);

        setTeammatesTaskSections(
          teammateTaskSections as TeammateTaskSectionResponse[],
        );
        setTaskColumns(data);
        setTaskStatus(data);
      },
      [setTaskColumns, setTeammatesTaskSections, setTaskStatus],
    ),
  );

  return {
    setMyTasks,
  };
};

const useSetters = () => {
  const { setTeammatesTaskColumns } = useTeammateTaskColumnResponse();

  const setTaskColumns = useAtomCallback(
    useCallback(
      (_get, _set, data: MyTasksResponse) => {
        const teammateTaskSections = getNodesFromEdges<
          TeammateTaskColumnResponse,
          MyTasksResponse['teammateTaskColumns']
        >(data.teammateTaskColumns);

        setTeammatesTaskColumns(teammateTaskSections);
      },
      [setTeammatesTaskColumns],
    ),
  );

  const setTaskStatus = useAtomCallback(
    useCallback((_get, set, data: MyTasksResponse) => {
      if (data.teammateTaskListStatus) {
        set(taskListStatusState, data.teammateTaskListStatus);
      }
    }, []),
  );

  return {
    setTaskColumns,
    setTaskStatus,
  };
};
