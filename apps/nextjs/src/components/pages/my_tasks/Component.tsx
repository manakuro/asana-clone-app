'use client';

import { MainHeader } from '@/components/features/MainHeader';
import { Flex } from '@/components/ui/Flex';
import { Head } from '@/components/ui/Head';
import { TabPanel, TabPanels, Tabs } from '@/components/ui/Tabs';
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
import { useParams, usePathname } from 'next/navigation';
import React, { memo, useCallback, useEffect } from 'react';
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

const TASKS_INDEX = 0 as const;
const BOARD_INDEX = 1 as const;
const CALENDAR_INDEX = 2 as const;
const FILES_INDEX = 3 as const;
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

  const setLoading = useCallback(() => {
    startTabContentLoading();
    setTimeout(() => {
      endTabContentLoading();
    }, 200);
  }, [startTabContentLoading, endTabContentLoading]);

  const handleTabsChange = useCallback(
    async (index: number) => {
      switch (index as Index) {
        case TASKS_INDEX: {
          setLoading();
          setTabIndex(TASKS_INDEX);
          setTabStatus('List');
          navigateToMyTasksList();
          break;
        }
        case BOARD_INDEX: {
          if (isSorted('project')) sortBy(TaskListSortStatusCode.None);
          setLoading();
          setTabIndex(BOARD_INDEX);
          setTabStatus('Board');
          navigateToMyTasksBoard();
          break;
        }
        case CALENDAR_INDEX: {
          setLoading();
          setTabIndex(CALENDAR_INDEX);
          setTabStatus('Calendar');
          navigateToMyTasksCalendar();
          break;
        }
        case FILES_INDEX: {
          setLoading();
          setTabIndex(FILES_INDEX);
          setTabStatus('Files');
          await navigateToMyTasksFiles();
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
      setLoading,
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
    // Force update tab status based on URL
    /* eslint react-hooks/exhaustive-deps: off */
  }, []);

  return (
    <Tabs
      index={tabIndex}
      onChange={handleTabsChange}
      flex={1}
      display="flex"
      isLazy
    >
      <Flex data-testid="MyTasks" flex={1} flexDirection="column">
        <Head title="My Tasks" />
        <MainHeader>
          <Header loading={queryLoading} />
        </MainHeader>
        <Flex flex={1}>
          <TabPanels>
            <TabPanel>
              <List />
            </TabPanel>
            <TabPanel>
              <Board />
            </TabPanel>
            <TabPanel>
              <Calendar />
            </TabPanel>
            <TabPanel>
              <Files />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Flex>
    </Tabs>
  );
});
