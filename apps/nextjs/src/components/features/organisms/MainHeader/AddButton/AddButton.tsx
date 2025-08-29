import { useInviteModal } from '@/components/features/organisms/Modals/InviteModal/useInviteModal';
import {
  Flex,
  type FlexProps,
  Icon,
  IconButton,
  Portal,
  Text,
} from '@/components/ui/atoms';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@/components/ui/organisms/Menu';
import type { IconType } from '@/shared/icons';
import { memo, useCallback } from 'react';

export const AddButton = memo(function AddButton() {
  const inviteModal = useInviteModal();

  const handleInvite = useCallback(() => {
    inviteModal.setIsOpen(true);
  }, [inviteModal]);

  return (
    <Menu placement="bottom-end" isLazy>
      <MenuButton
        aria-label="Add button"
        borderRadius="full"
        as={IconButton}
        icon={<Icon icon="listPlus" />}
      />
      <Portal>
        <MenuList>
          <MenuItem isDisabled>
            <IconText icon="checkCircle">Task</IconText>
          </MenuItem>
          <MenuItem isDisabled>
            <IconText icon="outlineProject">Project</IconText>
          </MenuItem>
          <MenuItem isDisabled>
            <IconText icon="messageRoundedDots">Message</IconText>
          </MenuItem>
          <MenuItem onClick={handleInvite}>
            <IconText icon="userPlus">Invite</IconText>
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
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
