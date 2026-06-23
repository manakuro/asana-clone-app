import { memo, useCallback } from 'react';
import { useInviteModal } from '@/components/features/modals';
import { PADDING_X } from '@/components/features/navigation/navigation';
import { TeammateAvatar } from '@/components/features/teammate-avatar';
import { Wrap, WrapItem } from '@/components/ui/wrap';
import { useClickableHoverStyle } from '@/hooks';
import { useTeammates } from '@/store/entities/teammate';
import { Teammate } from './teammate';

export const Teammates = memo(function Teammates() {
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const inviteModal = useInviteModal();
  const { teammateIds } = useTeammates();

  const handleInvitePeople = useCallback(() => {
    inviteModal.setIsOpen(true);
  }, [inviteModal]);

  return (
    <Wrap p={2} px={PADDING_X}>
      {teammateIds.map((t) => (
        <Teammate teammateId={t} key={t} />
      ))}
      <WrapItem>
        <TeammateAvatar
          teammateId=""
          size="xs"
          colorPalette="gray"
          {...clickableHoverLightStyle}
          onClick={handleInvitePeople}
        />
      </WrapItem>
    </Wrap>
  );
});
