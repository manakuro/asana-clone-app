import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { loadingState } from '../atom';

export const useGlobalUILoading = () => {
  const [loading, setLoading] = useAtom(loadingState);

  const endLoading = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  return {
    loading,
    endLoading,
  };
};
