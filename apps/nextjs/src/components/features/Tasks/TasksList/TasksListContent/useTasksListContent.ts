import { atom, useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

const refAtom = atom<HTMLElement | null>(null);

export const useTasksListContent = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useAtom(refAtom);

  useEffect(() => {
    if (ref.current) {
      setState(ref.current);
    }

    return () => {
      setState(null);
    };
  }, [setState]);

  return {
    ref,
    dom: state,
  };
};
