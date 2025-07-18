import type { NextRouter } from 'next/router';
import React, { memo, useCallback, useEffect } from 'react';
import { MainHeader } from 'src/components/features/organisms/MainHeader';
import { Flex } from 'src/components/ui/atoms';
import { Head } from 'src/components/ui/atoms/Head';
import { TabPanel, TabPanels, Tabs } from 'src/components/ui/organisms/Tabs';
import {
  isMyTasksBoardURL,
  isMyTasksCalendarURL,
  isMyTasksDetailURL,
  isMyTasksFilesURL,
  isMyTasksListURL,
  useRouter,
} from 'src/router';
import { useMyTasksTaskListStatus } from 'src/store/app/myTasks/taskListStatus';
import { TaskListSortStatusCode } from 'src/store/entities/taskListSortStatus';
import {
  type TeammateTaskTabStatus,
  TeammateTaskTabStatusCode,
  useTeammateTaskTabStatus,
  useTeammateTaskTabStatusCommand,
} from 'src/store/entities/teammateTaskTabStatus';
import { Board } from './Board';
import { Calendar } from './Calendar';
import { Files } from './Files';
import { Header } from './Header';
import { List } from './List';
import { Provider, useMyTasksContext } from './Provider';

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
  router,
  tabStatus,
}: {
  router: NextRouter;
  tabStatus: TeammateTaskTabStatus['statusCode'];
}): Index => {
  if (isMyTasksListURL(router)) return TASKS_INDEX;
  if (isMyTasksBoardURL(router)) return BOARD_INDEX;
  if (isMyTasksCalendarURL(router)) return CALENDAR_INDEX;
  if (isMyTasksFilesURL(router)) return FILES_INDEX;

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
    router,
  } = useRouter();
  const { isTabStatus, teammateTaskTabStatus } = useTeammateTaskTabStatus();
  const { setTabStatus } = useTeammateTaskTabStatusCommand();
  const { isSorted, sortBy } = useMyTasksTaskListStatus();
  const { queryLoading, startTabContentLoading, endTabContentLoading } =
    useMyTasksContext();
  const [tabIndex, setTabIndex] = React.useState<Index>(
    mapURLtoTabStatus({ router, tabStatus: teammateTaskTabStatus.statusCode }),
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
          await navigateToMyTasksList();
          break;
        }
        case BOARD_INDEX: {
          if (isSorted('project')) sortBy(TaskListSortStatusCode.None);
          setLoading();
          setTabIndex(BOARD_INDEX);
          setTabStatus('Board');
          await navigateToMyTasksBoard();
          break;
        }
        case CALENDAR_INDEX: {
          setLoading();
          setTabIndex(CALENDAR_INDEX);
          setTabStatus('Calendar');
          await navigateToMyTasksCalendar();
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
    if (isMyTasksDetailURL(router)) {
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

    if (isMyTasksListURL(router)) {
      setTabStatus('List');
      return;
    }
    if (isMyTasksBoardURL(router)) {
      if (isSorted('project')) sortBy(TaskListSortStatusCode.None);
      setTabStatus('Board');
      return;
    }
    if (isMyTasksCalendarURL(router)) {
      setTabStatus('Calendar');
      return;
    }
    if (isMyTasksFilesURL(router)) {
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
