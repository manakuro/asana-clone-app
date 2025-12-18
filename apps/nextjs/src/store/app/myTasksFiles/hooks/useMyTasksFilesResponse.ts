import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { asyncForEach } from '@/shared/utils';
import type { MyTaskFileResponse } from '@/store/app/myTasksFiles/type';
import { useTaskCommand } from '@/store/entities/task';
import { type TaskFile, taskFileState } from '@/store/entities/taskFile';

export const useMyTasksFilesResponse = () => {
  const { setTaskFile, setTaskStatus } = useSetters();

  const setMyTasksTaskFiles = useAtomCallback(
    useCallback(
      async (_get, _set, data: MyTaskFileResponse[]) => {
        setTaskFile(data);
        await setTaskStatus(data);
      },
      [setTaskFile, setTaskStatus],
    ),
  );

  return {
    setMyTasksTaskFiles,
  };
};

const useSetters = () => {
  const { setTaskById } = useTaskCommand();
  const setTaskFile = useAtomCallback(
    useCallback((_get, set, data: MyTaskFileResponse[]) => {
      const taskFiles: TaskFile[] = data.map(({ task, ...rest }) => rest);

      taskFiles.forEach((a) => {
        set(taskFileState(a.id), a);
      });
    }, []),
  );

  const setTaskStatus = useAtomCallback(
    useCallback(
      async (_get, _set, data: MyTaskFileResponse[]) => {
        const tasks: MyTaskFileResponse['task'][] = data.map(
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
    setTaskFile,
    setTaskStatus,
  };
};
