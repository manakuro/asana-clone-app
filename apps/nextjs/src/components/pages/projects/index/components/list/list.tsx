import { memo, useCallback } from 'react';
import { useProjectsProjectId } from '@/components/pages/projects/index/store/projects/project';
import { Flex } from '@/components/ui/flex';
import { TasksContainer } from '@/features/task/components/tasks-container/tasks-container';
import {
  AddTaskButton,
  CustomizeButton,
  CustomizeMenu,
  IncompleteTasksMenu,
  MoreActionMenu,
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
import { TaskDetailDrawer } from '@/features/task-detail/components/task-detail-drawer';
import {
  getProjectsDetailId,
  isProjectsDetailURL,
  useRouterProjects,
} from '@/router/projects';
import { useProjectsPageContext } from '../../contexts/context';
import { SortMenu } from '../tasks-header';
import { SkeletonListContent, SkeletonListHeader } from './skeleton-list';

export const List = memo(function List() {
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
  const { navigateToProjectsList } = useRouterProjects();
  const { hasClickedOutside } = useTasksListDetail({
    isTaskDetailURL: isProjectsDetailURL,
    getTaskDetailId: getProjectsDetailId,
    fetchQuery: fetchTaskDetailQuery,
    tabContentLoading,
  });

  const backToPage = useCallback(() => {
    navigateToProjectsList(projectId);
  }, [navigateToProjectsList, projectId]);

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
            <AddTaskButton />
          </TasksHeaderLeft>
          <TasksHeaderRight>
            <IncompleteTasksMenu
              startLoading={startContentLoading}
              endLoading={endContentLoading}
            />
            <SortMenu />
            <CustomizeButton />
            <MoreActionMenu />
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
        backToPage={backToPage}
        hasClickedOutside={hasClickedOutside}
      />
    </>
  );
});
