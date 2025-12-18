import { useEffect, useRef } from 'react';
import { useMountedRef } from '@/hooks/useMountedRef';

export const useDebounce = <T>(
  value: T,
  callback: (value: T) => void,
  delay: number,
  options?: {
    skip?: boolean;
  },
) => {
  const timer = useRef<number | null>(null);
  const { mountedRef } = useMountedRef();

  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current);
    if (options?.skip) return;

    timer.current = window.setTimeout(() => {
      if (!mountedRef.current) return;

      callback(value);
    }, delay);
  }, [callback, delay, mountedRef, options?.skip, value]);
};
