import type { Teammate } from '@/store/entities/teammate';
import { useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useMemo } from 'react';

const invitedTeammatesState = atomWithReset<Teammate[]>([]);

export const useShareProjectModalInvitedTeammates = () => {
  const [invitedTeammates, setInvitedTeammates] = useAtom(
    invitedTeammatesState,
  );
  const resetInvitedTeammates = useResetAtom(invitedTeammatesState);

  const hasInvitedTeammates = useMemo(
    () => !!invitedTeammates.length,
    [invitedTeammates.length],
  );

  return {
    invitedTeammates,
    setInvitedTeammates,
    resetInvitedTeammates,
    hasInvitedTeammates,
  };
};
