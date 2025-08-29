import { TaskDetailDrawer } from '@/components/features/organisms/TaskDetails';
import {
  AddTaskButton,
  CustomizeButton,
  CustomizeMenu,
  IncompleteTasksMenu,
  TasksContainer,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
  TasksList,
  TasksListBody,
  TasksListContent,
  TasksListHeader,
  TasksListHorizontalScrollBorder,
  TasksListLayout,
  useTasksListDetail,
} from '@/components/features/organisms/Tasks';
import { Flex } from '@/components/ui/atoms';
import { useMyTasksContext } from '@/pages/MyTasks/Provider';
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from '@/router';
import { memo } from 'react';
import { SortMenu } from '../TasksHeader';
import { SkeletonListContent, SkeletonListHeader } from './SkeletonList';

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
