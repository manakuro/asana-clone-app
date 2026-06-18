import { memo, useCallback } from 'react';
import { useInviteModal } from '@/components/features/Modals';
import { PADDING_X } from '@/components/features/Navigation/Navigation';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { Wrap, WrapItem } from '@/components/ui/wrap';
import { useClickableHoverStyle } from '@/hooks';
import { useTeammates } from '@/store/entities/teammate';
import { Teammate } from './Teammate';

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
