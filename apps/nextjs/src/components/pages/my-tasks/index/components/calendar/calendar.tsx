import { memo } from 'react';
import { useMyTasksContext } from '@/components/pages/my-tasks/index/contexts/context';
import { TasksCalendar } from '@/features/task/components/tasks-calendar/tasks-calendar';
import { TasksCalendarContent } from '@/features/task/components/tasks-calendar/tasks-calendar-content/tasks-calendar-content';
import { TasksCalendarList } from '@/features/task/components/tasks-calendar/tasks-calendar-list/tasks-calendar-list';
import { TasksCalendarListHeader } from '@/features/task/components/tasks-calendar/tasks-calendar-list-header/tasks-calendar-list-header';
import { useTasksCalendarDetail } from '@/features/task/components/tasks-calendar/use-tasks-calendar-detail';
import { TasksContainer } from '@/features/task/components/tasks-container/tasks-container';
import {
  CalendarMonthPicker,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
  TodayButton,
} from '@/features/task/components/tasks-header';
import { TaskDetailModal } from '@/features/task-detail/components/task-detail-modal';
import {
  getMyTasksDetailId,
  isMyTasksDetailURL,
  useRouterMyTasks,
} from '@/router/my-tasks';
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
  const { navigateToMyTasksCalendar } = useRouterMyTasks();

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
