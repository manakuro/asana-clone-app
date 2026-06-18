import type React from 'react';
import { memo } from 'react';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { Flex } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import { useTeammate } from '@/store/entities/teammate';

type Props = {
  teammateId: string;
};

export const MemberListItem: React.FC<Props> = memo<Props>((props) => {
  const { teammateId } = props;
  const { teammate } = useTeammate(teammateId);
  return (
    <Flex flex={1} py={3} alignItems="center">
      <TeammateAvatar teammateId={teammate.id} size="sm" />
      <Flex
        ml={3}
        flexDirection="column"
        minW="1px"
        flex={1}
        justifyContent="center"
      >
        <Text fontSize="sm" fontWeight="medium" lineClamp={1}>
          {teammate.name}
        </Text>
        <Text fontSize="xs" color="fg.muted">
          {teammate.email}
        </Text>
      </Flex>
    </Flex>
  );
});
MemberListItem.displayName = 'MemberListItem';
