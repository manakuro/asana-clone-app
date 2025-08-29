import {
  useProjectsPageQuery,
  useProjectsTaskDetailPageQuery,
} from '@/hooks/queries/app';
import { useRouter } from '@/router';
import { getProjectsIdFromURL } from '@/router/projects';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { memo, useCallback, useEffect } from 'react';
import { Component } from './Component';

export const Container = memo(function Container() {
  const { router } = useRouter();
  const { projectId, setProjectId } = useProjectsProjectId();
  const { loading, startLoading } = useProjectsPageQuery({ projectId });
  const { refetch: refetchProjectsTaskDetailPageQuery } =
    useProjectsTaskDetailPageQuery();

  useEffect(() => {
    const id = getProjectsIdFromURL(router);
    if (!id) return;
    if (projectId === id) return;

    console.log('projectId: ', id);
    startLoading();
    setProjectId(id);
  }, [router, setProjectId, startLoading, projectId]);

  const fetchTaskDetailQuery = useCallback(
    async (variables: { taskId: string }) => {
      await refetchProjectsTaskDetailPageQuery({
        taskId: variables.taskId,
        projectId: projectId,
      });
    },
    [projectId, refetchProjectsTaskDetailPageQuery],
  );

  return (
    <Component loading={loading} fetchTaskDetailQuery={fetchTaskDetailQuery} />
  );
});
