import type { Getter } from 'jotai';
import { dateFns } from '@/shared/dateFns';
import type { ProjectTaskSection } from '@/store/entities/projectTaskSection';
import type { Task } from '@/store/entities/task';
import { taskLikesByTaskIdState } from '@/store/entities/taskLike';
import {
  TaskPriorityType,
  taskPriorityState,
} from '@/store/entities/taskPriority';
import { teammateState } from '@/store/entities/teammate';
import {
  isTaskListCompletedStatusState,
  isTaskListSortStatusState,
} from './taskListStatus';

type Params = {
  get: Getter;
};

export const sortProjectTaskSections =
  (_: Params) => (p: ProjectTaskSection[]) => {
    return sortByCreatedAt(p);
  };

export const sortTasks = (params: Params) => (t: Task[]) => {
  let tasks = sortByCreatedAt(t);
  tasks = sortByDueDate(params)(t);
  tasks = sortByLikes(params)(tasks);
  tasks = sortByAlphabetical(params)(tasks);
  tasks = sortByAssignee(params)(tasks);
  tasks = sortByCreationTime(params)(tasks);
  tasks = sortByPriority(params)(tasks);

  return tasks;
};

const sortByCreatedAt = <T extends { createdAt: string }>(data: T[]): T[] => {
  return [...data].sort((a, b) => {
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;

    return new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1;
  });
};

export const sortByDueDate =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListSortStatusState('dueDate'))) return tasks;

    return [...tasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return new Date(a.dueDate) < new Date(b.dueDate) ? -1 : 1;
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

export const sortByAssignee =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListSortStatusState('assignee'))) return tasks;

    return [...tasks].sort((a, b) => {
      const teammateA = get(teammateState(a.assigneeId));
      const teammateB = get(teammateState(b.assigneeId));
      const nameA = teammateA.name.toLowerCase();
      const nameB = teammateB.name.toLowerCase();

      if (!nameA) return 1;
      if (!nameB) return -1;
      if (nameA === nameB) return 0;

      return nameA < nameB ? -1 : 1;
    });
  };

export const sortByCreationTime =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListSortStatusState('creationTime'))) return tasks;

    return [...tasks].sort((a, b) => {
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;

      return new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1;
    });
  };

const PRIORITY_LIST = [
  TaskPriorityType.High,
  TaskPriorityType.Medium,
  TaskPriorityType.Low,
];
export const sortByPriority =
  ({ get }: Params) =>
  (tasks: Task[]) => {
    if (!get(isTaskListSortStatusState('priority'))) return tasks;

    return [...tasks].sort((a, b) => {
      if (!a.taskPriorityId) return 1;
      if (!b.taskPriorityId) return -1;

      return (
        PRIORITY_LIST.indexOf(
          get(taskPriorityState(a.taskPriorityId)).priorityType as any,
        ) -
        PRIORITY_LIST.indexOf(
          get(taskPriorityState(b.taskPriorityId)).priorityType as any,
        )
      );
    });
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
