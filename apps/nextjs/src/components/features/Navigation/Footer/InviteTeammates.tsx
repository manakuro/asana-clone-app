import type React from 'react';
import { useCallback } from 'react';
import { useInviteModal } from '@/components/features/Modals/InviteModal/useInviteModal';
import { Separator } from '@/components/features/Navigation/Separator';
import { Icon } from '@/components/ui/icon';
import { List } from '@/components/ui/list';
import { Text } from '@/components/ui/text';
import { transitions } from '@/styles/transitions';
import { PADDING_X } from '../Navigation';

export const InviteTeammates: React.FC = () => {
  const { setIsOpen } = useInviteModal();

  const handleClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <>
      <Separator />
      <List.Item
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
        <Text fontSize="sm" color="fg">
          Invite teammates
        </Text>
      </List.Item>
    </>
  );
};
