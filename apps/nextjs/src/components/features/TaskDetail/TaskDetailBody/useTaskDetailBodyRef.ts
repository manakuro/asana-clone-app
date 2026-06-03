import { atom, useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

type State = HTMLElement | null;

const refAtom = atom<State>(null);

type Props = {
  loading: boolean;
};

export const useTaskDetailBodyRef = (props?: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useAtom(refAtom);

  useEffect(() => {
    if (!props?.loading && ref.current) {
      setState(ref.current);
    }
  }, [setState, props?.loading]);

  return {
    ref,
    taskDetailBodyDom: state,
  };
};
