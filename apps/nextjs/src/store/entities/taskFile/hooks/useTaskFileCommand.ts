import { useCallback } from 'react';
import { uuid } from '@/shared/uuid';
import { initialState } from '../atom';
import type { TaskFile } from '../type';
import { useUpsert } from './useUpsert';

export const useTaskFileCommand = () => {
  const { upsert } = useUpsert();

  const addTaskFile = useCallback(
    (input: Partial<TaskFile>) => {
      const id = uuid();
      upsert({
        ...initialState(),
        ...input,
        id,
      });
      return id;
    },
    [upsert],
  );

  return {
    addTaskFile,
  };
};
