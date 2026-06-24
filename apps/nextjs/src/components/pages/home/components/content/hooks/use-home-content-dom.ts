import { atom, useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

const refAtom = atom<HTMLElement | null>(null);

export const useHomeContentDom = <R extends HTMLElement>() => {
  const ref = useRef<R | null>(null);
  const [dom, setDom] = useAtom(refAtom);

  useEffect(() => {
    if (ref.current) {
      setDom(ref.current);
    }

    return () => {
      setDom(null);
    };
  }, [setDom]);

  return {
    ref,
    dom,
  };
};
