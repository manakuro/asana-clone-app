import { memo } from 'react';
import { TaskDetailModal } from '@/components/features/task-details/components/task-detail-modal';
import { TasksContainer } from '@/components/features/tasks/components/tasks-container/tasks-container';
import { TasksFilesContent } from '@/components/features/tasks/components/tasks-files/tasks-files-content/tasks-files-content';
import { TasksFilesList } from '@/components/features/tasks/components/tasks-files/tasks-files-list/tasks-files-list';
import { useTasksFilesDetail } from '@/components/features/tasks/components/tasks-files/use-tasks-files-detail';
import { useMyTasksContext } from '@/components/pages/my-tasks/contexts/context';
import { Flex } from '@/components/ui/flex';
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from '@/router';
import { SkeletonFiles } from './skeleton-files';

export const Files = memo(function Files() {
  return (
    <TasksContainer isMyTasksPage>
      <Component />
    </TasksContainer>
  );
});

const Component = memo(function Component() {
  const { tabContentLoading, fetchTaskDetailQuery } = useMyTasksContext();

  const { navigateToMyTasksFiles } = useRouter();

  useTasksFilesDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
    fetchQuery: fetchTaskDetailQuery,
    tabContentLoading,
  });

  if (tabContentLoading) return <SkeletonFiles />;

  return (
    <>
      <Flex flex={1} h="full" flexDirection="column" bg="gray.50">
        <TasksFilesContent>
          <TasksFilesList />
        </TasksFilesContent>
      </Flex>
      <TaskDetailModal backToPage={navigateToMyTasksFiles} />
    </>
  );
});
