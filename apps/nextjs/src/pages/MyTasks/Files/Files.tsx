import { TaskDetailModal } from '@/components/features/organisms/TaskDetails';
import {
  TasksContainer,
  TasksFilesContent,
  TasksFilesList,
} from '@/components/features/organisms/Tasks';
import { useTasksFilesDetail } from '@/components/features/organisms/Tasks/TasksFiles/useTasksFilesDetail';
import { Flex } from '@/components/ui/atoms';
import { useMyTasksContext } from '@/pages/MyTasks/Provider';
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from '@/router';
import { memo } from 'react';
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
