import { memo } from 'react';
import { useMyTasksContext } from '@/components/pages/my-tasks/contexts/context';
import { Flex } from '@/components/ui/flex';
import { TasksContainer } from '@/features/task/components/tasks-container/tasks-container';
import {
  AddTaskButton,
  CustomizeButton,
  CustomizeMenu,
  IncompleteTasksMenu,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
} from '@/features/task/components/tasks-header';
import { TasksList } from '@/features/task/components/tasks-list';
import { TasksListBody } from '@/features/task/components/tasks-list/tasks-list-body/tasks-list-body';
import { TasksListContent } from '@/features/task/components/tasks-list/tasks-list-content/tasks-list-content';
import { TasksListHeader } from '@/features/task/components/tasks-list/tasks-list-header/tasks-list-header';
import { TasksListHorizontalScrollBorder } from '@/features/task/components/tasks-list/tasks-list-horizontal-scroll-border/tasks-list-horizontal-scroll-border';
import { TasksListLayout } from '@/features/task/components/tasks-list/tasks-list-layout/tasks-list-layout';
import { useTasksListDetail } from '@/features/task/components/tasks-list/use-tasks-list-detail';
import { TaskDetailDrawer } from '@/features/task-details/components/task-detail-drawer';
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from '@/router';
import { SortMenu } from '../tasks-header';
import { SkeletonListContent, SkeletonListHeader } from './skeleton-list';

export const List = memo(function List() {
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
    contentLoading,
    startContentLoading,
    endContentLoading,
  } = useMyTasksContext();
  const { navigateToMyTasksList } = useRouter();
  const { hasClickedOutside } = useTasksListDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
    fetchQuery: fetchTaskDetailQuery,
    tabContentLoading,
  });

  if (tabContentLoading)
    return (
      <Flex flex={1} flexDirection="column">
        <SkeletonListHeader />
        <SkeletonListContent />
      </Flex>
    );

  return (
    <>
      <TasksList>
        <TasksHeader>
          <TasksHeaderLeft>
            <AddTaskButton solid />
          </TasksHeaderLeft>
          <TasksHeaderRight>
            <IncompleteTasksMenu
              startLoading={startContentLoading}
              endLoading={endContentLoading}
            />
            <SortMenu />
            <CustomizeButton />
          </TasksHeaderRight>
        </TasksHeader>
        {contentLoading ? (
          <SkeletonListContent />
        ) : (
          <TasksListContent>
            <TasksListHeader />
            <TasksListBody>
              <TasksListLayout />
            </TasksListBody>
            <TasksListHorizontalScrollBorder />
          </TasksListContent>
        )}
      </TasksList>
      <CustomizeMenu />
      <TaskDetailDrawer
        backToPage={navigateToMyTasksList}
        hasClickedOutside={hasClickedOutside}
      />
    </>
  );
});
