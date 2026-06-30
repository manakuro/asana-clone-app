import { memo } from 'react';
import { TaskDetailDrawer } from '@/components/features/task-details/task-detail-drawer';
import { TasksContainer } from '@/components/features/tasks/tasks-container/tasks-container';
import {
  AddTaskButton,
  CustomizeButton,
  CustomizeMenu,
  IncompleteTasksMenu,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
} from '@/components/features/tasks/tasks-header';
import { TasksList } from '@/components/features/tasks/tasks-list';
import { TasksListBody } from '@/components/features/tasks/tasks-list/tasks-list-body/tasks-list-body';
import { TasksListContent } from '@/components/features/tasks/tasks-list/tasks-list-content/tasks-list-content';
import { TasksListHeader } from '@/components/features/tasks/tasks-list/tasks-list-header/tasks-list-header';
import { TasksListHorizontalScrollBorder } from '@/components/features/tasks/tasks-list/tasks-list-horizontal-scroll-border/tasks-list-horizontal-scroll-border';
import { TasksListLayout } from '@/components/features/tasks/tasks-list/tasks-list-layout/tasks-list-layout';
import { useTasksListDetail } from '@/components/features/tasks/tasks-list/use-tasks-list-detail';
import { useMyTasksContext } from '@/components/pages/my-tasks/providers/context';
import { Flex } from '@/components/ui/flex';
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
