import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

type State = {
  selectedIndex: number;
};

const menuAtom = atom<State>({
  selectedIndex: 0,
});

export const useSearchMenuIndex = () => {
  const [state, setState] = useAtom(menuAtom);

  const setSelectedIndex = useCallback(
    (val: number) => {
      setState((s) => ({ ...s, selectedIndex: val }));
    },
    [setState],
  );

  return {
    ...state,
    setSelectedIndex,
  };
};
