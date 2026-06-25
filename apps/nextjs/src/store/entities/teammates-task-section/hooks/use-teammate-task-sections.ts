import { useAtomValue } from 'jotai';
import { teammatesTaskSectionsState } from '../atom';

export const useTeammateTaskSections = () => {
  const teammateTaskSections = useAtomValue(teammatesTaskSectionsState);

  return {
    teammateTaskSections,
  };
};
