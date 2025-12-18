import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { uniqBy } from '@/shared/utils';
import { projectTaskState } from '@/store/entities/projectTask';
import { useTaskCollaboratorResponse } from '@/store/entities/taskCollaborator';
import { taskFeedState } from '@/store/entities/taskFeed';
import { useTaskFeedLikeResponse } from '@/store/entities/taskFeedLike';
import { taskFileState } from '@/store/entities/taskFile';
import { useTaskLikeResponse } from '@/store/entities/taskLike';
import { taskTagState } from '@/store/entities/taskTag';
import { useTeammateResponse } from '@/store/entities/teammate';
import { taskState } from '../atom';
import type { TaskResponse } from '../type';

export const useTasksResponse = () => {
  const {
    setTasks,
    setAttachments,
    setTaskFeeds,
    setTags,
    setProjects,
    setTaskFeedLikes,
    setTaskLikes,
    setTeammates,
  } = useSetters();

  const setTasksFromResponse = useCallback(
    (data: TaskResponse[]) => {
      setTasks(data);
      setAttachments(data);
      setTaskFeeds(data);
      setTags(data);
      setProjects(data);
      setTaskFeedLikes(data);
      setTaskLikes(data);
      setTeammates(data);
    },
    [
      setTasks,
      setAttachments,
      setTaskFeeds,
      setTags,
      setProjects,
      setTaskFeedLikes,
      setTaskLikes,
      setTeammates,
    ],
  );

  return {
    setTasksFromResponse,
  };
};

const useSetters = () => {
  const { setTeammates: setTeammatesResponse } = useTeammateResponse();
  const { setTaskFeedLikes: setTaskFeedLikesResponse } =
    useTaskFeedLikeResponse();
  const { setTaskLikes: setTaskLikesResponse } = useTaskLikeResponse();
  const { setTaskCollaborators: setTaskCollaboratorsResponse } =
    useTaskCollaboratorResponse();

  const setTaskLikes = useCallback(
    (data: TaskResponse[]) => {
      const taskLikes = data.reduce<TaskResponse['taskLikes']>((acc, p) => {
        acc.push(...(p.taskLikes || []));
        return uniqBy(acc, 'id');
      }, []);
      setTaskLikesResponse(taskLikes);
    },
    [setTaskLikesResponse],
  );

  const setTaskFeedLikes = useCallback(
    (data: TaskResponse[]) => {
      const taskFeedLikes = data.reduce<TaskResponse['taskFeedLikes']>(
        (acc, p) => {
          acc.push(...(p.taskFeedLikes || []));
          return uniqBy(acc, 'id');
        },
        [],
      );
      setTaskFeedLikesResponse(taskFeedLikes);
    },
    [setTaskFeedLikesResponse],
  );

  const setTaskValue = useAtomCallback(
    useCallback((get, set, data: TaskResponse) => {
      const prev = get(taskState(data.id));
      set(taskState(data.id), {
        ...prev,
        ...data,
      });
    }, []),
  );
  const setTask = useCallback(
    (data: TaskResponse) => {
      if (data?.subTasks?.length) {
        data.subTasks.forEach((t) => {
          setTask(t as TaskResponse);
        });
        setTaskValue(data);
        return;
      }
      if (data?.parentTask) {
        setTask(data.parentTask as TaskResponse);
      }
      setTaskValue(data);
    },
    [setTaskValue],
  );

  const setTasks = useCallback(
    (data: TaskResponse[]) => {
      data.forEach((t) => {
        setTask(t);
      });
    },
    [setTask],
  );

  const setAttachments = useAtomCallback(
    useCallback((get, set, data: TaskResponse[]) => {
      data
        .reduce<TaskResponse['taskFiles']>((acc, p) => {
          acc.push(...(p.taskFiles || []));
          return uniqBy(acc, 'id');
        }, [])
        .forEach((t) => {
          const prev = get(taskFileState(t.id));
          set(taskFileState(t.id), {
            ...prev,
            ...t,
          });
        });
    }, []),
  );
  const setTaskFeeds = useAtomCallback(
    useCallback((get, set, data: TaskResponse[]) => {
      data
        .reduce<TaskResponse['taskFeeds']>((acc, p) => {
          acc.push(...(p.taskFeeds || []));
          return uniqBy(acc, 'id');
        }, [])
        .forEach((t) => {
          const prev = get(taskFeedState(t.id));
          set(taskFeedState(t.id), {
            ...prev,
            ...t,
          });
        });
    }, []),
  );
  const setTeammates = useCallback(
    (data: TaskResponse[]) => {
      const taskCollaborators = data.reduce<TaskResponse['taskCollaborators']>(
        (acc, d) => {
          acc.push(...(d.taskCollaborators || []));
          return acc;
        },
        [],
      );
      if (taskCollaborators.length) {
        setTaskCollaboratorsResponse(taskCollaborators);
        setTeammatesResponse(taskCollaborators.map((t) => t.teammate));
      }
    },
    [setTaskCollaboratorsResponse, setTeammatesResponse],
  );
  const setTags = useAtomCallback(
    useCallback((get, set, data: TaskResponse[]) => {
      data
        .reduce<TaskResponse['taskTags']>((acc, p) => {
          acc.push(...(p.taskTags || []));
          return uniqBy(acc, 'id');
        }, [])
        .forEach((t) => {
          const prev = get(taskTagState(t.id));
          set(taskTagState(t.id), {
            ...prev,
            ...t,
          });
        });
    }, []),
  );

  const setProjects = useAtomCallback(
    useCallback((get, set, data: TaskResponse[]) => {
      data
        .reduce<TaskResponse['projectTasks']>((acc, p) => {
          acc.push(...(p.projectTasks || []));
          return uniqBy(acc, 'id');
        }, [])
        .forEach((p) => {
          const prev = get(projectTaskState(p.id));
          set(projectTaskState(p.id), { ...prev, ...p });
        });
    }, []),
  );

  return {
    setAttachments,
    setTaskFeeds,
    setTeammates,
    setTags,
    setTasks,
    setProjects,
    setTaskFeedLikes,
    setTaskLikes,
  };
};
