import { memo, useCallback, useMemo } from 'react';
import { TaskDetailModal } from '@/components/features/task-details/task-detail-modal';
import { TasksContainer } from '@/components/features/tasks/tasks-container/tasks-container';
import { TasksFilesContent } from '@/components/features/tasks/tasks-files/tasks-files-content/tasks-files-content';
import { TasksFilesList } from '@/components/features/tasks/tasks-files/tasks-files-list/tasks-files-list';
import { useTasksFilesDetail } from '@/components/features/tasks/tasks-files/use-tasks-files-detail';
import { useProjectsPageContext } from '@/components/pages/projects/contexts/context';
import { Flex } from '@/components/ui/flex';
import { useProjectsFilesPageQuery } from '@/hooks/queries/app';
import { getProjectsDetailId, isProjectsDetailURL, useRouter } from '@/router';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { SkeletonFiles } from './skeleton-files';

export const Files = memo(function Files() {
  return (
    <TasksContainer isProjectsPage>
      <Component />
    </TasksContainer>
  );
});

const Component = memo(function Component() {
  const { tabContentLoading, fetchTaskDetailQuery } = useProjectsPageContext();
  const { projectId } = useProjectsProjectId();
  const { loading: queryLoading } = useProjectsFilesPageQuery();
  const loading = useMemo(
    () => tabContentLoading || queryLoading,
    [tabContentLoading, queryLoading],
  );
  const { navigateToProjectsFiles } = useRouter();

  const backToPage = useCallback(async () => {
    await navigateToProjectsFiles(projectId);
  }, [navigateToProjectsFiles, projectId]);

  useTasksFilesDetail({
    isTaskDetailURL: isProjectsDetailURL,
    getTaskDetailId: getProjectsDetailId,
    fetchQuery: fetchTaskDetailQuery,
    tabContentLoading,
  });

  if (loading) return <SkeletonFiles />;

  return (
    <>
      <Flex flex={1} h="full" flexDirection="column" bg="gray.50">
        <TasksFilesContent>
          <TasksFilesList />
        </TasksFilesContent>
      </Flex>
      <TaskDetailModal backToPage={backToPage} />
    </>
  );
});
