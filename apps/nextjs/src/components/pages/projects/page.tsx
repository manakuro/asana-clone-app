'use client';

import { useParams, usePathname } from 'next/navigation';
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { MainHeader } from '@/components/layout/main-header';
import { useMyTasksTaskListStatus } from '@/components/pages/my-tasks/store/my-tasks/task-list-status';
import { useProjectsProjectId } from '@/components/pages/projects/store/projects/project';
import { Flex } from '@/components/ui/flex';
import { Head } from '@/components/ui/head';
import { TabPanel, Tabs } from '@/components/ui/tabs';
import { TaskListSortStatusCode } from '@/features/task/store/task-list-sort-status';
import { usePrevious } from '@/hooks/use-previous';
import {
  isProjectsBoardURL,
  isProjectsCalendarURL,
  isProjectsFilesURL,
  isProjectsListURL,
  useRouter,
} from '@/router';
import { getProjectsIdFromURL, isProjectsOverviewURL } from '@/router/projects';
import { useProjectsTaskDetailPageQuery } from './api/use-projects-detail-page-query';
import { useProjectsPageQuery } from './api/use-projects-page-query';
import { Board } from './components/board';
import { Calendar } from './components/calendar';
import { Files } from './components/files';
import { Header } from './components/header';
import { List } from './components/list';
import { Overview } from './components/overview';
import { Context, useProjectsPageContext } from './contexts/context';

export const Page = memo(function Container() {
  const { projectId, setProjectId } = useProjectsProjectId();
  const { loading, startLoading } = useProjectsPageQuery({ projectId });
  const { refetch: refetchProjectsTaskDetailPageQuery } =
    useProjectsTaskDetailPageQuery();
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    const id = getProjectsIdFromURL(params, pathname);
    if (!id) return;
    if (projectId === id) return;

    startLoading();
    setProjectId(id);
  }, [setProjectId, startLoading, projectId, params, pathname]);

  const fetchTaskDetailQuery = useCallback(
    async (variables: { taskId: string }) => {
      await refetchProjectsTaskDetailPageQuery({
        taskId: variables.taskId,
        projectId: projectId,
      });
    },
    [projectId, refetchProjectsTaskDetailPageQuery],
  );

  return (
    <Context loading={loading} fetchTaskDetailQuery={fetchTaskDetailQuery}>
      <ProjectsView />
    </Context>
  );
});

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

const mapURLtoTabIndex = ({ pathname }: { pathname: string | null }): Index => {
  if (isProjectsListURL(pathname)) return LIST_INDEX;
  if (isProjectsBoardURL(pathname)) return BOARD_INDEX;
  if (isProjectsCalendarURL(pathname)) return CALENDAR_INDEX;
  if (isProjectsFilesURL(pathname)) return FILES_INDEX;
  if (isProjectsOverviewURL(pathname)) return OVERVIEW_INDEX;

  return LIST_INDEX;
};

const ProjectsView = memo(function ProjectsView() {
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
