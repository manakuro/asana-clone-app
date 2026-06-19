import { memo } from 'react';
import {
  TasksContainer,
  TasksFilesContent,
  TasksFilesList,
} from '@/components/features/Tasks';
import { useTasksFilesDetail } from '@/components/features/Tasks/TasksFiles/useTasksFilesDetail';
import { TaskDetailModal } from '@/components/features/task-details';
import { useMyTasksContext } from '@/components/pages/my_tasks/providers/Provider';
import { Flex } from '@/components/ui/flex';
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from '@/router';
import { SkeletonFiles } from './SkeletonFiles';

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
