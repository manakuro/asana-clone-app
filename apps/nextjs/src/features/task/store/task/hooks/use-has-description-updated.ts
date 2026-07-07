import { atom, useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';

const hasDescriptionUpdatedState = (_taskId: string) => atom<number>(1);

type Props = {
  taskId: string;
};

export const useHasDescriptionUpdatedValue = (props: Props) => {
  const hasDescriptionUpdated = useAtomValue(
    useMemo(() => hasDescriptionUpdatedState(props.taskId), [props.taskId]),
  );

  return {
    hasDescriptionUpdated,
  };
};

export const useSetHasDescriptionUpdated = () => {
  const setHasDescriptionUpdated = useAtomCallback(
    useCallback(async (get, set, taskId: string) => {
      const prev = get(hasDescriptionUpdatedState(taskId));
      set(hasDescriptionUpdatedState(taskId), prev + 1);
    }, []),
  );

  return {
    setHasDescriptionUpdated,
  };
};
