import type { Getter } from 'jotai';
import { dateFns } from '@/shared/dateFns';
import { uniq } from '@/shared/utils';
import {
  isTaskListCompletedStatusState,
  isTaskListSortStatusState,
} from '@/store/app/myTasks/taskListStatus';
import { projectTasksState } from '@/store/entities/projectTask';
import type { Task } from '@/store/entities/task';
import { taskLikesByTaskIdState } from '@/store/entities/taskLike';
import type { TeammateTaskSection } from '@/store/entities/teammatesTaskSection';

type Params = {
  get: Getter;
};

export const sortTeammateTaskSections =
  (_: Params) => (t: TeammateTaskSection[]) => {
    return sortByCreatedAt(t);
  };

export const sortTasks = (params: Params) => (t: Task[]) => {
  let tasks = sortByCreatedAt(t);
  tasks = sortByDueDate(params)(t);
  tasks = sortByLikes(params)(tasks);
  tasks = sortByAlphabetical(params)(tasks);

  return tasks;
};

export const sortByDueDate =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListSortStatusState('dueDate'))) return tasks;

    return [...tasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return a.dueDate < b.dueDate ? -1 : 1;
    });
  };

export const sortByLikes =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListSortStatusState('likes'))) return tasks;

    return [...tasks].sort((a, b) => {
      const taskLikesA = get(taskLikesByTaskIdState(a.id));
      const taskLikesB = get(taskLikesByTaskIdState(b.id));
      return taskLikesA.length < taskLikesB.length ? 1 : -1;
    });
  };

export const sortByAlphabetical =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListSortStatusState('alphabetical'))) return tasks;

    return [...tasks].sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
    );
  };
const sortByCreatedAt = <T extends { createdAt: string }>(data: T[]): T[] => {
  return [...data].sort((a, b) => {
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;

    return a.createdAt < b.createdAt ? -1 : 1;
  });
};

export const filterByProjectTasks =
  ({ get, projectId }: Params & { projectId: string }) =>
  (tasks: Task[]) => {
    const projectTasks = get(projectTasksState);
    const taskIdsWithProject = uniq(
      projectTasks
        .filter((p) => p.projectId === projectId)
        .map((p) => p.taskId),
    );
    return tasks.filter((t) => taskIdsWithProject.includes(t.id));
  };

export const filterByNoProject =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    const projectTasks = get(projectTasksState);
    const taskIdsWithProject = uniq(projectTasks.map((p) => p.taskId));

    return tasks.filter((t) => !taskIdsWithProject.includes(t.id));
  };

export const filterTasks = (params: Params) => (t: Task[]) => {
  let tasks = filterByIncomplete(params)(t);
  tasks = filterByAllCompleted(params)(tasks);
  tasks = filterByCompletedSinceToday(params)(tasks);
  tasks = filterByCompletedSinceYesterday(params)(tasks);
  tasks = filterByCompletedSince1Week(params)(tasks);
  tasks = filterByCompletedSince2Weeks(params)(tasks);
  tasks = filterByCompletedSince3Weeks(params)(tasks);
  return tasks;
};

export const filterByIncomplete =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListCompletedStatusState('incomplete'))) return tasks;
    return tasks.filter((t) => !t.completed);
  };

export const filterByAllCompleted =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListCompletedStatusState('completed'))) return tasks;
    return tasks.filter((t) => t.completed);
  };

const getDuration = (date: string) => {
  return dateFns.intervalToDuration({
    start: new Date(date),
    end: new Date(),
  });
};
export const filterByCompletedSinceToday =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListCompletedStatusState('completedToday'))) return tasks;

    return tasks.filter((t) => {
      if (!t.completedAt) return false;

      const duration = getDuration(t.completedAt);
      return t.completed && duration.days === 0;
    });
  };

export const filterByCompletedSinceYesterday =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListCompletedStatusState('completedYesterday')))
      return tasks;

    return tasks.filter((t) => {
      if (!t.completedAt) return false;

      const duration = getDuration(t.completedAt);
      return t.completed && Number(duration.days) <= 1;
    });
  };

export const filterByCompletedSince1Week =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListCompletedStatusState('completed1Week'))) return tasks;

    return tasks.filter((t) => {
      if (!t.completedAt) return false;

      const duration = getDuration(t.completedAt);
      return t.completed && Number(duration.days) <= 7;
    });
  };

export const filterByCompletedSince2Weeks =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListCompletedStatusState('completed2Weeks'))) return tasks;

    return tasks.filter((t) => {
      if (!t.completedAt) return false;

      const duration = getDuration(t.completedAt);
      return t.completed && Number(duration.days) <= 14;
    });
  };

export const filterByCompletedSince3Weeks =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListCompletedStatusState('completed3Weeks'))) return tasks;

    return tasks.filter((t) => {
      if (!t.completedAt) return false;

      const duration = getDuration(t.completedAt);
      return t.completed && Number(duration.days) <= 21;
    });
  };
