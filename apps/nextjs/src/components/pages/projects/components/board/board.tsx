import { memo, useCallback } from 'react';
import { TaskDetailDrawer } from '@/components/features/task-details/task-detail-drawer';
import { TasksBoardContent } from '@/components/features/tasks/tasks-board/tasks-board-content/tasks-board-content';
import { TasksBoardList } from '@/components/features/tasks/tasks-board/tasks-board-list/tasks-board-list';
import { useTasksBoardDetail } from '@/components/features/tasks/tasks-board/use-tasks-board-detail';
import { TasksContainer } from '@/components/features/tasks/tasks-container/tasks-container';
import {
  CustomizeButton,
  CustomizeMenu,
  IncompleteTasksMenu,
  TasksHeader,
  TasksHeaderRight,
} from '@/components/features/tasks/tasks-header';
import { useProjectsPageContext } from '@/components/pages/projects/providers/context';
import { Flex } from '@/components/ui/flex';
import { getProjectsDetailId, isProjectsDetailURL, useRouter } from '@/router';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { SortMenu } from '../tasks-header';
import { SkeletonBoardContent, SkeletonBoardHeader } from './skeleton-board';

export const Board = memo(function Board() {
  return (
    <TasksContainer isProjectsPage>
      <Component />
    </TasksContainer>
  );
});

const Component = memo(function Component() {
  const {
    tabContentLoading,
    fetchTaskDetailQuery,
    contentLoading,
    startContentLoading,
    endContentLoading,
  } = useProjectsPageContext();
  const { projectId } = useProjectsProjectId();
  const { navigateToProjectsBoard } = useRouter();
  const { hasClickedOutside } = useTasksBoardDetail({
    isTaskDetailURL: isProjectsDetailURL,
    getTaskDetailId: getProjectsDetailId,
    fetchQuery: fetchTaskDetailQuery,
    tabContentLoading,
  });

  const backToPage = useCallback(async () => {
    await navigateToProjectsBoard(projectId);
  }, [navigateToProjectsBoard, projectId]);

  if (tabContentLoading)
    return (
      <Flex flex={1} flexDirection="column">
        <SkeletonBoardHeader />
        <SkeletonBoardContent />
      </Flex>
    );

  return (
    <>
      <Flex flex={1} h="full" flexDirection="column" bg="gray.50">
        <TasksHeader
          h="40px"
          boxShadow="sm"
          borderBottom={1}
          borderStyle="solid"
          borderColor="border"
          alignItems="center"
        >
          <TasksHeaderRight ml="auto">
            <IncompleteTasksMenu
              startLoading={startContentLoading}
              endLoading={endContentLoading}
            />
            <SortMenu />
            <CustomizeButton />
          </TasksHeaderRight>
        </TasksHeader>
        {contentLoading ? (
          <SkeletonBoardContent />
        ) : (
          <TasksBoardContent>
            <TasksBoardList />
          </TasksBoardContent>
        )}
      </Flex>
      <CustomizeMenu />
      <TaskDetailDrawer
        backToPage={backToPage}
        hasClickedOutside={hasClickedOutside}
      />
    </>
  );
});
