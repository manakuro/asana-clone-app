import { memo, useCallback } from 'react';
import { PADDING_X } from '@/components/layout/navigation/navigation';
import { Wrap, WrapItem } from '@/components/ui/wrap';
import { useInviteModal } from '@/features/teammate/components/invite-modal/use-invite-modal';
import { TeammateAvatar } from '@/features/teammate/components/teammate-avatar';
import { useClickableHoverStyle } from '@/hooks/styles/use-clickable-hover-style';
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
