import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

type State = {
  isOpen: boolean;
  src: string;
};

const videoAtom = atom<State>({
  isOpen: false,
  src: '',
});

export const useVideoPlayer = () => {
  const [state, setState] = useAtom(videoAtom);

  const onClose = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, [setState]);

  const setIsOpen = useCallback(
    (val: boolean) => {
      setState((s) => ({ ...s, isOpen: val }));
    },
    [setState],
  );

  const setSrc = useCallback(
    (val: string) => {
      setState((s) => ({ ...s, src: val }));
    },
    [setState],
  );

  return {
    state,
    setIsOpen,
    setSrc,
    onClose,
  };
};
