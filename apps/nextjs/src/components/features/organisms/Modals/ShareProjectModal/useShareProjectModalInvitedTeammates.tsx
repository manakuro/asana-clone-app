import { useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useMemo } from 'react';
import type { Teammate } from 'src/store/entities/teammate';

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
