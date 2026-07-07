'use client';

import { useParams, usePathname } from 'next/navigation';
import React, { memo, startTransition, useCallback, useEffect } from 'react';
import { MainHeader } from '@/components/layout/main-header';
import { useMyTasksTaskListStatus } from '@/components/pages/my-tasks/store/my-tasks/task-list-status';
import { Flex } from '@/components/ui/flex';
import { Head } from '@/components/ui/head';
import { TabPanel, Tabs } from '@/components/ui/tabs';
import { useMe } from '@/features/me/store/me';
import { TaskListSortStatusCode } from '@/features/task/store/task-list-sort-status';
import {
  type TeammateTaskTabStatus,
  TeammateTaskTabStatusCode,
  useTeammateTaskTabStatus,
  useTeammateTaskTabStatusCommand,
} from '@/features/teammate/store/teammate-task-tab-status';
import {
  isMyTasksBoardURL,
  isMyTasksCalendarURL,
  isMyTasksDetailURL,
  isMyTasksFilesURL,
  isMyTasksListURL,
  useRouter,
} from '@/router';
import { useMyTasksDetailPageQuery } from './api/use-my-tasks-detail-page-query';
import { useMyTasksPageQuery } from './api/use-my-tasks-page-query';
import { BeforeMount } from './components/before-mount';
import { Board } from './components/board';
import { Calendar } from './components/calendar';
import { Files } from './components/files';
import { Header } from './components/header';
import { List } from './components/list';
import { Context, useMyTasksContext } from './contexts/context';

export function Page() {
  const { loading } = useMyTasksPageQuery();
  const { refetch } = useMyTasksDetailPageQuery();
  const { me } = useMe();

  const fetchTaskDetailQuery = useCallback(
    async (variables: { taskId: string }) => {
      await refetch({ taskId: variables.taskId, teammateId: me.id });
    },
    [me.id, refetch],
  );

  return (
    <BeforeMount>
      <Context loading={loading} fetchTaskDetailQuery={fetchTaskDetailQuery}>
        <Component />
      </Context>
    </BeforeMount>
  );
}

const TASKS_INDEX = 'list' as const;
const BOARD_INDEX = 'board' as const;
const CALENDAR_INDEX = 'calendar' as const;
const FILES_INDEX = 'files' as const;
type Index =
  | typeof TASKS_INDEX
  | typeof BOARD_INDEX
  | typeof CALENDAR_INDEX
  | typeof FILES_INDEX;

const mapURLtoTabStatus = ({
  pathname,
  tabStatus,
}: {
  pathname: string | null;
  tabStatus: TeammateTaskTabStatus['statusCode'];
}): Index => {
  if (isMyTasksListURL(pathname)) return TASKS_INDEX;
  if (isMyTasksBoardURL(pathname)) return BOARD_INDEX;
  if (isMyTasksCalendarURL(pathname)) return CALENDAR_INDEX;
  if (isMyTasksFilesURL(pathname)) return FILES_INDEX;

  switch (tabStatus) {
    case TeammateTaskTabStatusCode.List:
      return TASKS_INDEX;
    case TeammateTaskTabStatusCode.Board:
      return BOARD_INDEX;
    case TeammateTaskTabStatusCode.Calendar:
      return CALENDAR_INDEX;
    case TeammateTaskTabStatusCode.Files:
      return FILES_INDEX;
  }

  return TASKS_INDEX;
};

const Component = memo(function Component() {
  const {
    navigateToMyTasksList,
    navigateToMyTasksBoard,
    navigateToMyTasksCalendar,
    navigateToMyTasksFiles,
  } = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const { isTabStatus, teammateTaskTabStatus } = useTeammateTaskTabStatus();
  const { setTabStatus } = useTeammateTaskTabStatusCommand();
  const { isSorted, sortBy } = useMyTasksTaskListStatus();
  const { queryLoading, startTabContentLoading, endTabContentLoading } =
    useMyTasksContext();
  const [tabIndex, setTabIndex] = React.useState<Index>(
    mapURLtoTabStatus({
      pathname,
      tabStatus: teammateTaskTabStatus.statusCode,
    }),
  );

  const handleTabsChange = useCallback(
    async (index: string) => {
      switch (index as Index) {
        case TASKS_INDEX: {
          startTabContentLoading();
          setTabIndex(TASKS_INDEX);
          startTransition(() => {
            setTabStatus('List');
            navigateToMyTasksList();
            endTabContentLoading();
          });
          break;
        }
        case BOARD_INDEX: {
          if (isSorted('project')) sortBy(TaskListSortStatusCode.None);
          startTabContentLoading();
          setTabIndex(BOARD_INDEX);
          startTransition(() => {
            setTabStatus('Board');
            navigateToMyTasksBoard();
            endTabContentLoading();
          });
          break;
        }
        case CALENDAR_INDEX: {
          startTabContentLoading();
          setTabIndex(CALENDAR_INDEX);
          startTransition(() => {
            setTabStatus('Calendar');
            navigateToMyTasksCalendar();
            endTabContentLoading();
          });
          break;
        }
        case FILES_INDEX: {
          startTabContentLoading();
          setTabIndex(FILES_INDEX);
          startTransition(() => {
            setTabStatus('Files');
            navigateToMyTasksFiles();
            endTabContentLoading();
          });
          break;
        }
      }
    },
    [
      isSorted,
      navigateToMyTasksList,
      navigateToMyTasksBoard,
      navigateToMyTasksCalendar,
      navigateToMyTasksFiles,
      sortBy,
      setTabStatus,
      startTabContentLoading,
      endTabContentLoading,
    ],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Force update tab status based on URL
  useEffect(() => {
    // When task detail opening
    if (isMyTasksDetailURL(params, pathname)) {
      switch (true) {
        case isTabStatus('List'): {
          setTabIndex(TASKS_INDEX);
          break;
        }
        case isTabStatus('Board'): {
          setTabIndex(BOARD_INDEX);
          break;
        }
        case isTabStatus('Calendar'): {
          setTabIndex(CALENDAR_INDEX);
          break;
        }
        case isTabStatus('Files'): {
          setTabIndex(FILES_INDEX);
          break;
        }
      }
      return;
    }

    if (isMyTasksListURL(pathname)) {
      setTabStatus('List');
      return;
    }
    if (isMyTasksBoardURL(pathname)) {
      if (isSorted('project')) sortBy(TaskListSortStatusCode.None);
      setTabStatus('Board');
      return;
    }
    if (isMyTasksCalendarURL(pathname)) {
      setTabStatus('Calendar');
      return;
    }
    if (isMyTasksFilesURL(pathname)) {
      setTabStatus('Files');
      return;
    }
  }, []);

  return (
    <Tabs
      value={tabIndex}
      onValueChange={(e) => handleTabsChange(e.value)}
      flex={1}
      display="flex"
      lazyMount
      unmountOnExit
    >
      <Flex data-testid="MyTasks" flex={1} flexDirection="column">
        <Head title="My Tasks" />
        <MainHeader>
          <Header loading={queryLoading} />
        </MainHeader>
        <Flex flex={1}>
          <Flex flex={1}>
            <TabPanel value="list">
              <List />
            </TabPanel>
            <TabPanel value="board">
              <Board />
            </TabPanel>
            <TabPanel value="calendar">
              <Calendar />
            </TabPanel>
            <TabPanel value="files">
              <Files />
            </TabPanel>
          </Flex>
        </Flex>
      </Flex>
    </Tabs>
  );
});
