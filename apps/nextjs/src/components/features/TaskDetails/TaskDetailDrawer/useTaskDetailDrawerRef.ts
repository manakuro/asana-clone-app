'use client';

import { atom, useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

type State = HTMLElement | null;

const refAtom = atom<State>(null);

export const useTaskDetailDrawerRef = (deps?: any) => {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useAtom(refAtom);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (ref.current) {
      setState(ref.current);
    }
  }, [setState, deps]);

  return {
    ref,
    taskDetailListDetailRef: state,
  };
};
