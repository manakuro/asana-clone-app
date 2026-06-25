import { atom, useAtom } from 'jotai';

const _key = (str: string) =>
  `src/store/entities/workspace/hooks/useHasDescriptionUpdated/${str}`;

const hasDescriptionUpdatedState = atom<number>(1);

export const useHasDescriptionUpdated = () => {
  const [hasDescriptionUpdated, setHasDescriptionUpdated] = useAtom(
    hasDescriptionUpdatedState,
  );

  return {
    hasDescriptionUpdated,
    setHasDescriptionUpdated,
  };
};
