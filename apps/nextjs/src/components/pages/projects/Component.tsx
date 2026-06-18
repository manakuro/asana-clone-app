import { usePathname } from 'next/navigation';
import { memo, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { MainHeader } from '@/components/features/MainHeader';
import { Flex } from '@/components/ui/flex';
import { Head } from '@/components/ui/head';
import { TabPanel, Tabs } from '@/components/ui/tabs';
import { usePrevious } from '@/hooks';
import {
  isProjectsBoardURL,
  isProjectsCalendarURL,
  isProjectsFilesURL,
  isProjectsListURL,
  useRouter,
} from '@/router';
import { isProjectsOverviewURL } from '@/router/projects';
import { useMyTasksTaskListStatus } from '@/store/app/myTasks/taskListStatus';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { TaskListSortStatusCode } from '@/store/entities/taskListSortStatus';
import { Board } from './components/Board';
import { Calendar } from './components/Calendar';
import { Files } from './components/Files';
import { Header } from './components/Header';
import { List } from './components/List';
import { Overview } from './components/Overview';
import { Provider, useProjectsPageContext } from './providers/Provider';

type Props = {
  loading: boolean;
  fetchTaskDetailQuery: (variables: { taskId: string }) => Promise<void>;
};

const OVERVIEW_INDEX = 'overview' as const;
const LIST_INDEX = 'list' as const;
const BOARD_INDEX = 'board' as const;
const BOARD_TIMELINE = 'timeline' as const;
const CALENDAR_INDEX = 'calendar' as const;
const CALENDAR_DASHBOARD = 'dashboard' as const;
const FILES_INDEX = 'files' as const;
type Index =
  | typeof OVERVIEW_INDEX
  | typeof LIST_INDEX
  | typeof BOARD_INDEX
  | typeof BOARD_TIMELINE
  | typeof CALENDAR_INDEX
  | typeof CALENDAR_DASHBOARD
  | typeof FILES_INDEX;

export const Component = memo(function Component(props: Props) {
  return (
    <Provider
      loading={props.loading}
      fetchTaskDetailQuery={props.fetchTaskDetailQuery}
    >
      <WrappedComponent />
    </Provider>
  );
});

const mapURLtoTabIndex = ({ pathname }: { pathname: string | null }): Index => {
  if (isProjectsListURL(pathname)) return LIST_INDEX;
  if (isProjectsBoardURL(pathname)) return BOARD_INDEX;
  if (isProjectsCalendarURL(pathname)) return CALENDAR_INDEX;
  if (isProjectsFilesURL(pathname)) return FILES_INDEX;
  if (isProjectsOverviewURL(pathname)) return OVERVIEW_INDEX;

  return LIST_INDEX;
};

const WrappedComponent = memo(function WrappedComponent() {
  const {
    navigateToProjectsList,
    navigateToProjectsBoard,
    navigateToProjectsCalendar,
    navigateToProjectsFiles,
    navigateToProjectsOverview,
  } = useRouter();
  const { isSorted, sortBy } = useMyTasksTaskListStatus();
  const { queryLoading, startTabContentLoading, endTabContentLoading } =
    useProjectsPageContext();
  const pathname = usePathname();
  const [tabIndex, setTabIndex] = useState<Index>(
    mapURLtoTabIndex({ pathname }),
  );
  const { projectId } = useProjectsProjectId();
  const prevProjectId = usePrevious(projectId);
  const hasProjectChanged = useMemo(() => {
    if (!projectId || !prevProjectId) return false;
    if (projectId === prevProjectId) return false;
    return true;
  }, [prevProjectId, projectId]);

  useLayoutEffect(() => {
    if (hasProjectChanged) setTabIndex(LIST_INDEX);
  }, [hasProjectChanged]);

  const setLoading = useCallback(() => {
    startTabContentLoading();
    setTimeout(() => {
      endTabContentLoading();
    }, 200);
  }, [endTabContentLoading, startTabContentLoading]);

  const navigateToOverview = useCallback(() => {
    navigateToProjectsOverview(projectId);
  }, [navigateToProjectsOverview, projectId]);

  const navigateToFiles = useCallback(() => {
    navigateToProjectsFiles(projectId);
  }, [navigateToProjectsFiles, projectId]);

  const navigateToList = useCallback(() => {
    navigateToProjectsList(projectId);
  }, [navigateToProjectsList, projectId]);

  const navigateToBoard = useCallback(() => {
    navigateToProjectsBoard(projectId);
  }, [navigateToProjectsBoard, projectId]);

  const navigateToCalendar = useCallback(() => {
    navigateToProjectsCalendar(projectId);
  }, [navigateToProjectsCalendar, projectId]);

  const handleTabsChange = useCallback(
    async (index: string) => {
      switch (index as Index) {
        case OVERVIEW_INDEX: {
          setLoading();
          setTabIndex(OVERVIEW_INDEX);
          navigateToOverview();
          break;
        }
        case LIST_INDEX: {
          setLoading();
          setTabIndex(LIST_INDEX);
          navigateToList();
          break;
        }
        case BOARD_INDEX: {
          if (isSorted('project')) sortBy(TaskListSortStatusCode.None);
          setLoading();
          setTabIndex(BOARD_INDEX);
          navigateToBoard();
          break;
        }
        case CALENDAR_INDEX: {
          setLoading();
          setTabIndex(CALENDAR_INDEX);
          navigateToCalendar();
          break;
        }
        case FILES_INDEX: {
          setLoading();
          setTabIndex(FILES_INDEX);
          navigateToFiles();
          break;
        }
      }
    },
    [
      isSorted,
      navigateToOverview,
      navigateToList,
      navigateToBoard,
      navigateToCalendar,
      navigateToFiles,
      sortBy,
      setLoading,
    ],
  );

  return (
    <Tabs
      value={tabIndex}
      onValueChange={(e) => handleTabsChange(e.value)}
      flex={1}
      display="flex"
      lazyMount
      unmountOnExit
    >
      <Flex data-testid="Projects" flex={1} flexDirection="column" maxW="full">
        <Head title="Projects" />
        <MainHeader>
          <Header loading={queryLoading} />
        </MainHeader>
        <Flex flex={1}>
          <Flex flex={1}>
            <TabPanel value="overview">
              <Overview />
            </TabPanel>
            <TabPanel value="list">
              <List />
            </TabPanel>
            <TabPanel value="board">
              <Board />
            </TabPanel>
            <TabPanel value="timeline" />
            <TabPanel value="calendar">
              <Calendar />
            </TabPanel>
            <TabPanel value="dashboard" />
            <TabPanel value="files">
              <Files />
            </TabPanel>
          </Flex>
        </Flex>
      </Flex>
    </Tabs>
  );
});
