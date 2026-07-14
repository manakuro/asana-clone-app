import { memo } from 'react';
import { useMyTasksContext } from '@/components/pages/my-tasks/index/contexts/context';
import { Flex } from '@/components/ui/flex';
import { TasksBoardContent } from '@/features/task/components/tasks-board/tasks-board-content/tasks-board-content';
import { TasksBoardList } from '@/features/task/components/tasks-board/tasks-board-list/tasks-board-list';
import { useTasksBoardDetail } from '@/features/task/components/tasks-board/use-tasks-board-detail';
import { TasksContainer } from '@/features/task/components/tasks-container/tasks-container';
import {
  CustomizeButton,
  CustomizeMenu,
  IncompleteTasksMenu,
  TasksHeader,
  TasksHeaderRight,
} from '@/features/task/components/tasks-header';
import { TaskDetailDrawer } from '@/features/task-detail/components/task-detail-drawer';
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from '@/router';
import { SortMenu } from '../tasks-header';
import { SkeletonBoardContent, SkeletonBoardHeader } from './skeleton-board';

export const Board = memo(function Board() {
  return (
    <TasksContainer isMyTasksPage>
      <Component />
    </TasksContainer>
  );
});

const Component = memo(function Component() {
  const {
    tabContentLoading,
    fetchTaskDetailQuery,
    startContentLoading,
    endContentLoading,
    contentLoading,
  } = useMyTasksContext();
  const { navigateToMyTasksBoard } = useRouter();
  const { hasClickedOutside } = useTasksBoardDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
    fetchQuery: fetchTaskDetailQuery,
    tabContentLoading,
  });

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
            <SortMenu projectSortable={false} />
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
        backToPage={navigateToMyTasksBoard}
        hasClickedOutside={hasClickedOutside}
      />
    </>
  );
});
