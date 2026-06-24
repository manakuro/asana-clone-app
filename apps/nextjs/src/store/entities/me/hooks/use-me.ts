import { useAtom } from 'jotai';
import { meState } from '../atom';

export const useMe = () => {
  const [me, setMe] = useAtom(meState);

  return {
    me,
    setMe,
  };
};
