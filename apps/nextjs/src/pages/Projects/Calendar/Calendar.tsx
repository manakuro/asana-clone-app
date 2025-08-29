import { TaskDetailModal } from '@/components/features/organisms/TaskDetails';
import {
  TasksCalendar,
  TasksCalendarContent,
  TasksCalendarList,
  TasksCalendarListHeader,
  TasksContainer,
  useTasksCalendarDetail,
} from '@/components/features/organisms/Tasks';
import {
  CalendarMonthPicker,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
  TodayButton,
} from '@/components/features/organisms/Tasks/TasksHeader';
import { useProjectsPageContext } from '@/pages/Projects/Provider';
import { getProjectsDetailId, isProjectsDetailURL, useRouter } from '@/router';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { memo, useCallback } from 'react';
import { SkeletonCalendar } from './SkeletonCalendar';

export const Calendar = memo(function Calendar() {
  return (
    <TasksContainer isProjectsPage>
      <Component />
    </TasksContainer>
  );
});

const Component = memo(function Component() {
  const { tabContentLoading, fetchTaskDetailQuery } = useProjectsPageContext();
  const { navigateToProjectsCalendar } = useRouter();
  const { projectId } = useProjectsProjectId();

  useTasksCalendarDetail({
    isTaskDetailURL: isProjectsDetailURL,
    getTaskDetailId: getProjectsDetailId,
    fetchQuery: fetchTaskDetailQuery,
  });

  const backToPage = useCallback(async () => {
    await navigateToProjectsCalendar(projectId);
  }, [navigateToProjectsCalendar, projectId]);

  if (tabContentLoading) return <SkeletonCalendar />;

  return (
    <>
      <TasksCalendar>
        <TasksHeader
          h="40px"
          borderBottom={1}
          borderStyle="solid"
          borderColor="gray.200"
          alignItems="center"
        >
          <TasksHeaderLeft>
            <CalendarMonthPicker />
          </TasksHeaderLeft>
          <TasksHeaderRight ml="auto">
            <TodayButton />
          </TasksHeaderRight>
        </TasksHeader>
        <TasksCalendarListHeader />
        <TasksCalendarContent>
          <TasksCalendarList />
        </TasksCalendarContent>
      </TasksCalendar>
      <TaskDetailModal backToPage={backToPage} />
    </>
  );
});
