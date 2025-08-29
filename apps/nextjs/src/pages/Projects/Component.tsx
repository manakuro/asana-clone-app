import { MainHeader } from '@/components/features/organisms/MainHeader';
import { Flex } from '@/components/ui/atoms';
import { Head } from '@/components/ui/atoms/Head';
import { TabPanel, TabPanels, Tabs } from '@/components/ui/organisms/Tabs';
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
import type { NextRouter } from 'next/router';
import { memo, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { Board } from './Board';
import { Calendar } from './Calendar';
import { Files } from './Files';
import { Header } from './Header';
import { List } from './List';
import { Overview } from './Overview';
import { Provider, useProjectsPageContext } from './Provider';

type Props = {
  loading: boolean;
  fetchTaskDetailQuery: (variables: { taskId: string }) => Promise<void>;
};

const OVERVIEW_INDEX = 0 as const;
const LIST_INDEX = 1 as const;
const BOARD_INDEX = 2 as const;
const BOARD_TIMELINE = 3 as const;
const CALENDAR_INDEX = 4 as const;
const CALENDAR_DASHBOARD = 5 as const;
const FILES_INDEX = 6 as const;
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

const mapURLtoTabIndex = ({ router }: { router: NextRouter }): Index => {
  if (isProjectsListURL(router)) return LIST_INDEX;
  if (isProjectsBoardURL(router)) return BOARD_INDEX;
  if (isProjectsCalendarURL(router)) return CALENDAR_INDEX;
  if (isProjectsFilesURL(router)) return FILES_INDEX;
  if (isProjectsOverviewURL(router)) return OVERVIEW_INDEX;

  return LIST_INDEX;
};

const WrappedComponent = memo(function WrappedComponent() {
  const {
    navigateToProjectsList,
    navigateToProjectsBoard,
    navigateToProjectsCalendar,
    navigateToProjectsFiles,
    navigateToProjectsOverview,
    router,
  } = useRouter();
  const { isSorted, sortBy } = useMyTasksTaskListStatus();
  const { queryLoading, startTabContentLoading, endTabContentLoading } =
    useProjectsPageContext();
  const [tabIndex, setTabIndex] = useState<Index>(mapURLtoTabIndex({ router }));
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

  const navigateToOverview = useCallback(async () => {
    await navigateToProjectsOverview(projectId);
  }, [navigateToProjectsOverview, projectId]);

  const navigateToFiles = useCallback(async () => {
    await navigateToProjectsFiles(projectId);
  }, [navigateToProjectsFiles, projectId]);

  const navigateToList = useCallback(async () => {
    await navigateToProjectsList(projectId);
  }, [navigateToProjectsList, projectId]);

  const navigateToBoard = useCallback(async () => {
    await navigateToProjectsBoard(projectId);
  }, [navigateToProjectsBoard, projectId]);

  const navigateToCalendar = useCallback(async () => {
    await navigateToProjectsCalendar(projectId);
  }, [navigateToProjectsCalendar, projectId]);

  const handleTabsChange = useCallback(
    async (index: number) => {
      switch (index as Index) {
        case OVERVIEW_INDEX: {
          setLoading();
          setTabIndex(OVERVIEW_INDEX);
          await navigateToOverview();
          break;
        }
        case LIST_INDEX: {
          setLoading();
          setTabIndex(LIST_INDEX);
          await navigateToList();
          break;
        }
        case BOARD_INDEX: {
          if (isSorted('project')) sortBy(TaskListSortStatusCode.None);
          setLoading();
          setTabIndex(BOARD_INDEX);
          await navigateToBoard();
          break;
        }
        case CALENDAR_INDEX: {
          setLoading();
          setTabIndex(CALENDAR_INDEX);
          await navigateToCalendar();
          break;
        }
        case FILES_INDEX: {
          setLoading();
          setTabIndex(FILES_INDEX);
          await navigateToFiles();
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
      index={tabIndex}
      onChange={handleTabsChange}
      flex={1}
      display="flex"
      isLazy
    >
      <Flex data-testid="Projects" flex={1} flexDirection="column" maxW="full">
        <Head title="Projects" />
        <MainHeader>
          <Header loading={queryLoading} />
        </MainHeader>
        <Flex flex={1}>
          <TabPanels>
            <TabPanel>
              <Overview />
            </TabPanel>
            <TabPanel>
              <List />
            </TabPanel>
            <TabPanel>
              <Board />
            </TabPanel>
            <TabPanel />
            <TabPanel>
              <Calendar />
            </TabPanel>
            <TabPanel />
            <TabPanel>
              <Files />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Flex>
    </Tabs>
  );
});
