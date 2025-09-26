import { useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useCallback } from 'react';

type State = {
  isOpen: boolean;
  x: number;
  y: number;
  input: {
    url: string;
  };
  callback: (input: State['input']) => void;
};

const modalState = atomWithReset<State>({
  isOpen: false,
  x: 0,
  y: 0,
  input: {
    url: '',
  },
  callback: () => {},
});

export const useEditorLinkModal = () => {
  const [state, setState] = useAtom(modalState);
  const resetState = useResetAtom(modalState);

  const onClose = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
    state.callback(state.input);
    resetState();
  }, [resetState, setState, state]);

  const onOpen = useCallback(
    ({ x, y }: { x: State['x']; y: State['y'] }) => {
      return new Promise<State['input']>((resolve) => {
        setState((s) => ({
          ...s,
          isOpen: true,
          x,
          y,
          callback: resolve,
        }));
      });
    },
    [setState],
  );

  const setInput = useCallback(
    (input: State['input']) => {
      setState((s) => ({ ...s, input }));
    },
    [setState],
  );

  return {
    ...state,
    setInput,
    onOpen,
    onClose,
  };
};
