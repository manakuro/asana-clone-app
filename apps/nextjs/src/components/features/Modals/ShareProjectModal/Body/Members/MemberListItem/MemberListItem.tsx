import { memo } from 'react';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { Flex } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import { useClickableHoverStyle } from '@/hooks';
import { useTeammate } from '@/store/entities/teammate';
import { PermissionMenu } from '../../PermissionMenu';

type Props = {
  projectId: string;
  teammateId: string;
};

export const MemberListItem = memo(function MemberListItem(props: Props) {
  const { teammateId } = props;
  const { teammate } = useTeammate(teammateId);
  const { clickableHoverStyle } = useClickableHoverStyle();

  return (
    <Flex
      alignItems="center"
      h="50px"
      px={6}
      css={clickableHoverStyle}
      cursor="default"
    >
      <TeammateAvatar teammateId={teammateId} size="sm" />
      <Flex flexDirection="column" ml={2} flex={1}>
        <Text fontWeight="medium" fontSize="xs">
          {teammate.name}
        </Text>
        <Text fontSize="xs" color="fg.muted">
          {teammate.email}
        </Text>
      </Flex>
      <Flex>
        <PermissionMenu />
      </Flex>
    </Flex>
  );
});
