import { useInviteModal } from '@/components/features/Modals';
import { Button } from '@/components/ui/Button';
import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Tooltip } from '@/components/ui/Tooltip';
import { memo, useCallback } from 'react';

type Props = FlexProps;

export const InviteButton = memo(function InviteButton(props: Props) {
  const { setIsOpen } = useInviteModal();

  const handleClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <Flex alignItems="center" {...props}>
      <Tooltip
        hasArrow
        label="Manage team members"
        aria-label="A invite button description"
        openDelay={500}
      >
        <Button
          leftIcon={<Icon icon="userPlus" mt="1px" size="xs" />}
          variant="outline"
          size="xs"
          onClick={handleClick}
        >
          Invite
        </Button>
      </Tooltip>
    </Flex>
  );
});
