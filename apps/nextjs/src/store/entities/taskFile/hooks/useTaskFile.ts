import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { type TaskFile, taskFileState } from '@/store/entities/taskFile';
import { useUpsert } from './useUpsert';

export const useTaskFile = (taskFileId?: string) => {
  const taskFile = useAtomValue(
    useMemo(() => taskFileState(taskFileId || ''), [taskFileId]),
  );
  const { upsert } = useUpsert();

  const setTaskFile = useAtomCallback(
    useCallback(
      (get, _set, input: DeepPartial<TaskFile>) => {
        const prev = get(taskFileState(taskFile.id));
        upsert({
          ...prev,
          ...input,
          fileType: {
            ...prev.fileType,
            ...input.fileType,
          },
        });
      },
      [upsert, taskFile.id],
    ),
  );

  return {
    taskFile,
    setTaskFile,
  };
};
