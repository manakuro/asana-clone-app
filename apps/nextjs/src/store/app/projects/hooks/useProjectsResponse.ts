import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type ProjectTaskColumnResponse,
  useProjectTaskColumnResponse,
} from '@/store/entities/projectTaskColumn';
import { useProjectTaskSectionResponse } from '@/store/entities/projectTaskSection';
import type { ProjectTaskSectionResponse } from '@/store/entities/projectTaskSection/type';
import { taskListStatusState } from '../taskListStatus';
import type {
  ProjectsProjectTaskSectionResponse,
  ProjectsResponse,
} from '../type';

export const useProjectsResponse = () => {
  const { setProjectsTaskSections } = useProjectTaskSectionResponse();
  const { setTaskColumns, setTaskStatus } = useSetters();
  const setProjects = useAtomCallback(
    useCallback(
      (_get, _set, data: ProjectsResponse) => {
        const projectTaskSections = getNodesFromEdges<
          ProjectsProjectTaskSectionResponse,
          ProjectsResponse['projectTaskSections']
        >(data.projectTaskSections);

        setProjectsTaskSections(
          projectTaskSections as ProjectTaskSectionResponse[],
        );
        setTaskColumns(data);
        setTaskStatus(data);
      },
      [setTaskColumns, setProjectsTaskSections, setTaskStatus],
    ),
  );

  return {
    setProjects,
  };
};

const useSetters = () => {
  const { setProjectsTaskColumns } = useProjectTaskColumnResponse();

  const setTaskColumns = useAtomCallback(
    useCallback(
      (_get, _set, data: ProjectsResponse) => {
        const projectTaskColumns = getNodesFromEdges<
          ProjectTaskColumnResponse,
          ProjectsResponse['projectTaskColumns']
        >(data.projectTaskColumns);

        setProjectsTaskColumns(projectTaskColumns);
      },
      [setProjectsTaskColumns],
    ),
  );

  const setTaskStatus = useAtomCallback(
    useCallback((_get, set, data: ProjectsResponse) => {
      if (data.projectTaskListStatus)
        set(taskListStatusState, data.projectTaskListStatus);
    }, []),
  );

  return {
    setTaskColumns,
    setTaskStatus,
  };
};
