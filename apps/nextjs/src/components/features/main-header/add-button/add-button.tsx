import { memo, useCallback } from 'react';
import { useInviteModal } from '@/components/features/Modals/InviteModal/useInviteModal';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { Text } from '@/components/ui/text';
import type { IconType } from '@/shared/icons';

export const AddButton = memo(function AddButton() {
  const inviteModal = useInviteModal();

  const handleInvite = useCallback(() => {
    inviteModal.setIsOpen(true);
  }, [inviteModal]);

  return (
    <Menu.Root positioning={{ placement: 'bottom-end' }} lazyMount>
      <Menu.Trigger asChild>
        <IconButton
          aria-label="Add button"
          borderRadius="full"
          variant="subtle"
        >
          <Icon icon="listPlus" />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="0" disabled>
              <IconText icon="checkCircle">Task</IconText>
            </Menu.Item>
            <Menu.Item value="1" disabled>
              <IconText icon="outlineProject">Project</IconText>
            </Menu.Item>
            <Menu.Item value="2" disabled>
              <IconText icon="messageRoundedDots">Message</IconText>
            </Menu.Item>
            <Menu.Item value="3" onClick={handleInvite}>
              <IconText icon="userPlus">Invite</IconText>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
});

type IconTextProps = {
  icon: IconType;
} & FlexProps;

function IconText(props: IconTextProps) {
  const { icon, ...rest } = props;
  return (
    <Flex alignItems="center" {...rest}>
      <Icon icon={icon} mr={2} mt="-2px" color="gray.500" />
      <Text fontSize="sm">{props.children}</Text>
    </Flex>
  );
}
