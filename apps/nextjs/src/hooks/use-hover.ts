import useHoverReactHook from '@react-hook/hover';
import { type RefObject, useRef } from 'react';

export const useHover = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const isHovering = useHoverReactHook(ref as RefObject<HTMLElement>);

  return {
    ref,
    isHovering,
  };
};
