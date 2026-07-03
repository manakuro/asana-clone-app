import { atom, useAtom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

const loadingAtom = atom<boolean>(false);

export const idAtom = atomWithReset<string>('');

export const scrollIdAtom = atomWithReset<string>('');

export const useTaskDetail = () => {
  const [id, setId] = useAtom(idAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [scrollId, setScrollId] = useAtom(scrollIdAtom);

  return {
    loading,
    taskId: id,
    scrollId,
    setScrollId,
    setId,
    setLoading,
  };
};
