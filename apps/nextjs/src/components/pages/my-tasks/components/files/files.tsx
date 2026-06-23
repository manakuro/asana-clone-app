import { memo } from 'react';
import { TaskDetailModal } from '@/components/features/task-details';
import {
  TasksContainer,
  TasksFilesContent,
  TasksFilesList,
} from '@/components/features/tasks';
import { useTasksFilesDetail } from '@/components/features/tasks/tasks-files/use-tasks-files-detail';
import { useMyTasksContext } from '@/components/pages/my-tasks/providers/provider';
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
