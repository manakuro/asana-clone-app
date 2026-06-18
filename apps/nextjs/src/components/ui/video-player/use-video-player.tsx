import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

type State = {
  open: boolean;
  src: string;
};

const videoAtom = atom<State>({
  open: false,
  src: '',
});

export const useVideoPlayer = () => {
  const [state, setState] = useAtom(videoAtom);

  const onClose = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, [setState]);

  const setIsOpen = useCallback(
    (val: boolean) => {
      setState((s) => ({ ...s, open: val }));
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
