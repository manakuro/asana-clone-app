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
import { useMyTasksContext } from '@/pages/MyTasks/Provider';
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from '@/router';
import { memo } from 'react';
import { SkeletonCalendar } from './SkeletonCalendar';

export const Calendar = memo(function Calendar() {
  return (
    <TasksContainer isMyTasksPage>
      <Component />
    </TasksContainer>
  );
});

const Component = memo(function Component() {
  const { tabContentLoading, fetchTaskDetailQuery } = useMyTasksContext();
  const { navigateToMyTasksCalendar } = useRouter();

  useTasksCalendarDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
    fetchQuery: fetchTaskDetailQuery,
  });

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
      <TaskDetailModal backToPage={navigateToMyTasksCalendar} />
    </>
  );
});
