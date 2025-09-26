import { atom, useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

type State = HTMLElement | null;

const refAtom = atom<State>(null);

export const useTaskDetailBody = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useAtom(refAtom);

  useEffect(() => {
    if (ref.current) {
      setState(ref.current);
    }
  }, [setState]);

  return {
    ref,
    taskDetailBodyDom: state,
  };
};
