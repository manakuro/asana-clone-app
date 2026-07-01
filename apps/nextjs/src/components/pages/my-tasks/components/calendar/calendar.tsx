import { memo } from 'react';
import { useMyTasksContext } from '@/components/pages/my-tasks/contexts/context';
import { TaskDetailModal } from '@/features/task-details/components/task-detail-modal';
import { TasksCalendar } from '@/features/tasks/components/tasks-calendar/tasks-calendar';
import { TasksCalendarContent } from '@/features/tasks/components/tasks-calendar/tasks-calendar-content/tasks-calendar-content';
import { TasksCalendarList } from '@/features/tasks/components/tasks-calendar/tasks-calendar-list/tasks-calendar-list';
import { TasksCalendarListHeader } from '@/features/tasks/components/tasks-calendar/tasks-calendar-list-header/tasks-calendar-list-header';
import { useTasksCalendarDetail } from '@/features/tasks/components/tasks-calendar/use-tasks-calendar-detail';
import { TasksContainer } from '@/features/tasks/components/tasks-container/tasks-container';
import {
  CalendarMonthPicker,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
  TodayButton,
} from '@/features/tasks/components/tasks-header';
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from '@/router';
import { SkeletonCalendar } from './skeleton-calendar';

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
    tabContentLoading,
  });

  if (tabContentLoading) return <SkeletonCalendar />;

  return (
    <>
      <TasksCalendar>
        <TasksHeader
          h="40px"
          borderBottom={1}
          borderStyle="solid"
          borderColor="border"
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
