import { memo } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import type { Mention } from '@/features/editor/store/mention';
import { useTeammate } from '@/features/teammate/store/teammate';
import { LeftContainer } from './left-container';
import { RightContainer } from './right-container';

type Props = FlexProps & {
  mention: Mention;
};

export const Teammate = memo(function Teammate(props: Props) {
  const { teammate } = useTeammate(props.mention.id);

  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <Avatar
          name={teammate.name}
          src={teammate.image}
          size="xs"
          cursor="pointer"
          bg="teal.200"
        />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm">{teammate.name}</Text>
        <Text ml={5} fontSize="xs" color="fg.muted">
          {teammate.email}
        </Text>
      </RightContainer>
    </Flex>
  );
});
