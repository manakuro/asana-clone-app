import { atom, useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';

const hasDescriptionUpdatedState = (_projectId: string) => atom<number>(1);

type Props = {
  projectId: string;
};

export const useHasDescriptionUpdatedValue = (props: Props) => {
  const hasDescriptionUpdated = useAtomValue(
    useMemo(
      () => hasDescriptionUpdatedState(props.projectId),
      [props.projectId],
    ),
  );

  return {
    hasDescriptionUpdated,
  };
};

export const useSetHasDescriptionUpdated = () => {
  const setHasDescriptionUpdated = useAtomCallback(
    useCallback(async (get, set, projectId: string) => {
      const prev = get(hasDescriptionUpdatedState(projectId));
      set(hasDescriptionUpdatedState(projectId), prev + 1);
    }, []),
  );

  return {
    setHasDescriptionUpdated,
  };
};
