'use client';

import {
  useProjectsPageQuery,
  useProjectsTaskDetailPageQuery,
} from '@/hooks/queries/app';
import { getProjectsIdFromURL } from '@/router/projects';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useParams, usePathname } from 'next/navigation';
import { memo, useCallback, useEffect } from 'react';
import { Component } from './Component';

export const Container = memo(function Container() {
  const { projectId, setProjectId } = useProjectsProjectId();
  const { loading, startLoading } = useProjectsPageQuery({ projectId });
  const { refetch: refetchProjectsTaskDetailPageQuery } =
    useProjectsTaskDetailPageQuery();
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    const id = getProjectsIdFromURL(params, pathname);
    if (!id) return;
    if (projectId === id) return;

    console.log('projectId: ', id);
    startLoading();
    setProjectId(id);
  }, [setProjectId, startLoading, projectId, params, pathname]);

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
