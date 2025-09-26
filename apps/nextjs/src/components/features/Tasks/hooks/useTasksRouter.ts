import {
  getMyTasksDetailFeedId,
  getMyTasksDetailFeedURL,
  getProjectsDetailFeedId,
  getProjectsDetailFeedURL,
  isMyTasksDetailURLById,
  isProjectsDetailURLById,
  useRouter,
} from '@/router';
import type { Options } from '@/router/types';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { useTasksContext } from '../TasksProvider';

type Result = {
  navigateToTaskDetail: (taskId: string, options?: Options) => void;
  navigateToTaskBoard: (options?: Options) => Promise<void>;
  isTaskDetailURLById: (taskId: string) => boolean;
  getTasksDetailFeedURL: (props: {
    taskId: string;
    taskFeedId: string;
  }) => string;
  getTasksDetailFeedId: () => string;
};

export const useTasksRouter = (): Result => {
  const { isMyTasksPage, isHomePage, isInboxPage } = useTasksContext();
  const { projectId } = useProjectsProjectId();
  const {
    navigateToHomeDetail,
    navigateToMyTasksTaskDetail,
    navigateToProjectsTaskDetail,
    navigateToProjectsBoard,
    navigateToMyTasksBoard,
    navigateToInboxDetail,
  } = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const navigateToTaskDetail = useCallback(
    (taskId: string, options?: Options) => {
      if (isHomePage) {
        navigateToHomeDetail(taskId);
        return;
      }
      if (isInboxPage) {
        navigateToInboxDetail(taskId);
        return;
      }

      if (isMyTasksPage) {
        navigateToMyTasksTaskDetail(taskId, options);
        return;
      }

      navigateToProjectsTaskDetail(projectId, taskId, options);
    },
    [
      isHomePage,
      isInboxPage,
      isMyTasksPage,
      navigateToHomeDetail,
      navigateToInboxDetail,
      navigateToMyTasksTaskDetail,
      navigateToProjectsTaskDetail,
      projectId,
    ],
  );

  const navigateToTaskBoard = useCallback(
    async (options?: Options) => {
      if (isMyTasksPage) {
        navigateToMyTasksBoard(options);
        return;
      }

      navigateToProjectsBoard(projectId, options);
    },
    [isMyTasksPage, navigateToMyTasksBoard, navigateToProjectsBoard, projectId],
  );

  const isTaskDetailURLById = useCallback(
    (taskId: string) => {
      if (isMyTasksPage)
        return isMyTasksDetailURLById(params, pathname, taskId);

      return isProjectsDetailURLById(params, pathname, taskId);
    },
    [isMyTasksPage, params, pathname],
  );

  const getTasksDetailFeedURL = useCallback(
    ({ taskId, taskFeedId }: { taskId: string; taskFeedId: string }) => {
      if (isMyTasksPage) return getMyTasksDetailFeedURL(taskId, taskFeedId);

      return getProjectsDetailFeedURL(projectId, taskId, taskFeedId);
    },
    [isMyTasksPage, projectId],
  );

  const getTasksDetailFeedId = useCallback(() => {
    if (isMyTasksPage) return getMyTasksDetailFeedId(params, pathname);

    return getProjectsDetailFeedId(params, pathname);
  }, [isMyTasksPage, params, pathname]);

  return {
    navigateToTaskDetail,
    navigateToTaskBoard,
    isTaskDetailURLById,
    getTasksDetailFeedURL,
    getTasksDetailFeedId,
  };
};
