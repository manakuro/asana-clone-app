'use client';

import { useParams, usePathname } from 'next/navigation';
import React, { memo, startTransition, useCallback, useEffect } from 'react';
import { MainHeader } from '@/components/features/MainHeader';
import { Flex } from '@/components/ui/flex';
import { Head } from '@/components/ui/head';
import { TabPanel, Tabs } from '@/components/ui/tabs';
import {
  isMyTasksBoardURL,
  isMyTasksCalendarURL,
  isMyTasksDetailURL,
  isMyTasksFilesURL,
  isMyTasksListURL,
  useRouter,
} from '@/router';
import { useMyTasksTaskListStatus } from '@/store/app/myTasks/taskListStatus';
import { TaskListSortStatusCode } from '@/store/entities/taskListSortStatus';
import {
  type TeammateTaskTabStatus,
  TeammateTaskTabStatusCode,
  useTeammateTaskTabStatus,
  useTeammateTaskTabStatusCommand,
} from '@/store/entities/teammateTaskTabStatus';
import { Board } from './components/Board';
import { Calendar } from './components/Calendar';
import { Files } from './components/Files';
import { Header } from './components/Header';
import { List } from './components/List';
import { Provider, useMyTasksContext } from './providers/Provider';

type Props = {
  loading: boolean;
  fetchTaskDetailQuery: (variables: { taskId: string }) => Promise<void>;
};

const TASKS_INDEX = 'list' as const;
const BOARD_INDEX = 'board' as const;
const CALENDAR_INDEX = 'calendar' as const;
const FILES_INDEX = 'files' as const;
type Index =
  | typeof TASKS_INDEX
  | typeof BOARD_INDEX
  | typeof CALENDAR_INDEX
  | typeof FILES_INDEX;

export const Component = memo<Props>(function Component(props) {
  return (
    <Provider
      loading={props.loading}
      fetchTaskDetailQuery={props.fetchTaskDetailQuery}
    >
      <WrappedComponent />
    </Provider>
  );
});

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

const WrappedComponent = memo(function WrappedComponent() {
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
