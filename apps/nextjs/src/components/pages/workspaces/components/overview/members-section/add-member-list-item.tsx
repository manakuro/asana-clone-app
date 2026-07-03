import { memo, useCallback } from 'react';
import { Flex } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import { useInviteModal } from '@/features/teammate/components/invite-modal/use-invite-modal';
import { TeammateAvatar } from '@/features/teammate/components/teammate-avatar';
import { useClickableHoverStyle } from '@/hooks/styles/use-clickable-hover-style';

export const AddMemberListItem = memo(function AddMemberListItem() {
  const { setIsOpen } = useInviteModal();
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <Flex
      flex={1}
      py={3}
      alignItems="center"
      onClick={handleClick}
      cursor="pointer"
      css={clickableHoverLightStyle}
    >
      <TeammateAvatar teammateId="" size="sm" />
      <Flex
        ml={3}
        flexDirection="column"
        minW="1px"
        flex={1}
        justifyContent="center"
      >
        <Text fontSize="sm" fontWeight="medium" color="fg.muted">
          Add member
        </Text>
      </Flex>
    </Flex>
  );
});
