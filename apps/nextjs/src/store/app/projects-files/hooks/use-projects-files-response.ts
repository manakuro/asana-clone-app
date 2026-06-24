import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { asyncForEach } from '@/shared/utils';
import { useTaskCommand } from '@/store/entities/task';
import { type TaskFile, taskFileState } from '@/store/entities/taskFile';
import type { ProjectsFileResponse } from '../type';

export const useProjectsFilesResponse = () => {
  const { setAttachment, setTaskStatus } = useSetters();

  const setProjectsAttachments = useAtomCallback(
    useCallback(
      async (_get, _set, data: ProjectsFileResponse[]) => {
        setAttachment(data);
        await setTaskStatus(data);
      },
      [setAttachment, setTaskStatus],
    ),
  );

  return {
    setProjectsAttachments,
  };
};

const useSetters = () => {
  const { setTaskById } = useTaskCommand();
  const setAttachment = useAtomCallback(
    useCallback((_get, set, data: ProjectsFileResponse[]) => {
      const taskFiles: TaskFile[] = data.map(({ task, ...rest }) => rest);

      taskFiles.forEach((a) => {
        set(taskFileState(a.id), a);
      });
    }, []),
  );

  const setTaskStatus = useAtomCallback(
    useCallback(
      async (_get, _set, data: ProjectsFileResponse[]) => {
        const tasks: ProjectsFileResponse['task'][] = data.map(
          ({ task }) => task,
        );

        await asyncForEach(tasks, async (t) => {
          await setTaskById(t.id, t);
        });
      },
      [setTaskById],
    ),
  );

  return {
    setAttachment,
    setTaskStatus,
  };
};
