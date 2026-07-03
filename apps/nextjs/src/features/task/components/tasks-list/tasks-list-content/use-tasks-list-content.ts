import { atom, useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

const refAtom = atom<HTMLDivElement | null>(null);

export const useTasksListContent = () => {
  const ref = useRef<HTMLDivElement>(null);
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
