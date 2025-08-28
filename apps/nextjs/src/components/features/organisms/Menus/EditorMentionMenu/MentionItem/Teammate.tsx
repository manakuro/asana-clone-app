import { Avatar, Flex, type FlexProps, Text } from '@/components/ui/atoms';
import type { Mention } from '@/store/entities/mention';
import { useTeammate } from '@/store/entities/teammate';
import { memo } from 'react';
import { LeftContainer } from './LeftContainer';
import { RightContainer } from './RightContainer';

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
        <Text ml={5} fontSize="xs" color="text.muted">
          {teammate.email}
        </Text>
      </RightContainer>
    </Flex>
  );
});
