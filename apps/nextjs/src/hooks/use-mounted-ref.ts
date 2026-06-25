import { useEffect, useRef } from 'react';

export const useMountedRef = () => {
  const mountedRef = useRef<boolean | null>(null);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  });

  return {
    mountedRef,
  };
};
