import { memo, useCallback } from 'react';
import { Flex } from '@/components/ui/flex';
import { TaskDetailDrawer } from '@/features/task-details/components/task-detail-drawer';
import { TasksContainer } from '@/features/tasks/components/tasks-container/tasks-container';
import {
  AddTaskButton,
  CustomizeButton,
  CustomizeMenu,
  IncompleteTasksMenu,
  MoreActionMenu,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
} from '@/features/tasks/components/tasks-header';
import { TasksList } from '@/features/tasks/components/tasks-list';
import { TasksListBody } from '@/features/tasks/components/tasks-list/tasks-list-body/tasks-list-body';
import { TasksListContent } from '@/features/tasks/components/tasks-list/tasks-list-content/tasks-list-content';
import { TasksListHeader } from '@/features/tasks/components/tasks-list/tasks-list-header/tasks-list-header';
import { TasksListHorizontalScrollBorder } from '@/features/tasks/components/tasks-list/tasks-list-horizontal-scroll-border/tasks-list-horizontal-scroll-border';
import { TasksListLayout } from '@/features/tasks/components/tasks-list/tasks-list-layout/tasks-list-layout';
import { useTasksListDetail } from '@/features/tasks/components/tasks-list/use-tasks-list-detail';
import { getProjectsDetailId, isProjectsDetailURL, useRouter } from '@/router';
import { useProjectsProjectId } from '@/store/app/projects/project';
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
  const { navigateToProjectsList } = useRouter();
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
