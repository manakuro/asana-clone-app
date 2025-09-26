import { useInviteModal } from '@/components/features/organisms/Modals/InviteModal/useInviteModal';
import { Divider } from '@/components/features/organisms/Navigation/Divider';
import { Icon } from '@/components/ui/atoms/Icon';
import { ListItem } from '@/components/ui/atoms/List';
import { Text } from '@/components/ui/atoms/Text';
import { transitions } from '@/styles';
import type React from 'react';
import { useCallback } from 'react';
import { PADDING_X } from '../Navigation';

export const InviteTeammates: React.FC = () => {
  const { setIsOpen } = useInviteModal();

  const handleClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <>
      <Divider />
      <ListItem
        display="flex"
        alignItems="center"
        px={PADDING_X}
        py={4}
        _hover={{
          bg: 'navigation.hover.dark',
        }}
        transition={transitions.base()}
        cursor="pointer"
        onClick={handleClick}
      >
        <Icon icon="userPlus" color="primary" mr={PADDING_X} mt="-2px" />
        <Text fontSize="sm">Invite teammates</Text>
      </ListItem>
    </>
  );
};
