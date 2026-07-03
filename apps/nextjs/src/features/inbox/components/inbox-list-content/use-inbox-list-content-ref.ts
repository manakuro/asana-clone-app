'use client';

import { atom, useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

const refAtom = atom<HTMLElement | null>(null);

export const useInboxListContentRef = <R extends HTMLElement>() => {
  const ref = useRef<R | null>(null);
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
    element: state,
  };
};
