import { memo, useCallback } from 'react';
import type { Teammate } from '@/store/entities/teammate';
import { uniqBy } from '@/utils';
import { useShareProjectModalInvitedTeammates } from '../../use-share-project-modal-invited-teammates';
import { BodyHeader } from '../body-header';
import { BodyStack } from '../body-stack';
import { InviteForm } from './invite-form';
import { SendForm } from './send-form';

type Props = {
  projectId: string;
  loading: boolean;
  onSetMembersTab: () => void;
};

export const Share = memo(function Share(props: Props) {
  const { projectId, onSetMembersTab } = props;
  const { invitedTeammates, setInvitedTeammates } =
    useShareProjectModalInvitedTeammates();

  const handleSetInvitedTeammates = useCallback(
    (val: Teammate) => {
      setInvitedTeammates((s) => uniqBy([...s, val], 'id'));
    },
    [setInvitedTeammates],
  );

  const handleDeleteInvitedTeammate = useCallback(
    (teammateId: string) => {
      setInvitedTeammates((s) => s.filter((t) => t.id !== teammateId));
    },
    [setInvitedTeammates],
  );

  return (
    <BodyStack flex={1} px={6}>
      <BodyHeader>Invite with email</BodyHeader>
      {invitedTeammates.length ? (
        <SendForm
          projectId={projectId}
          onSetInvitedTeammates={handleSetInvitedTeammates}
          invitedTeammates={invitedTeammates}
          onDeleteInvitedTeammate={handleDeleteInvitedTeammate}
        />
      ) : (
        <InviteForm
          projectId={projectId}
          onSetMembersTab={onSetMembersTab}
          onSetInvitedTeammates={handleSetInvitedTeammates}
        />
      )}
    </BodyStack>
  );
});
