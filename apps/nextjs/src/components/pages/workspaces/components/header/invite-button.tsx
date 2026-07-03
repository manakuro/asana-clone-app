import { memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Tooltip } from '@/components/ui/tooltip';
import { useInviteModal } from '@/features/teammates/components/invite-modal/use-invite-modal';

type Props = FlexProps;

export const InviteButton = memo(function InviteButton(props: Props) {
  const { setIsOpen } = useInviteModal();

  const handleClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <Flex alignItems="center" {...props}>
      <Tooltip
        showArrow
        content="Manage team members"
        aria-label="A invite button description"
        openDelay={500}
      >
        <Button variant="outline" size="xs" onClick={handleClick}>
          <Icon icon="userPlus" mt="1px" size="xs" />
          Invite
        </Button>
      </Tooltip>
    </Flex>
  );
});
