import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Text } from '@/components/ui/Text';
import type { Mention } from '@/store/entities/mention';
import { useWorkspace } from '@/store/entities/workspace';
import { memo } from 'react';
import { LeftContainer } from './LeftContainer';
import { RightContainer } from './RightContainer';

type Props = FlexProps & {
  mention: Mention;
};

export const Workspace = memo(function Workspace(props: Props) {
  const { workspace } = useWorkspace();

  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <Icon icon="group" color="text.muted" />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm" w="80%" noOfLines={1}>
          {workspace.name}
        </Text>
      </RightContainer>
    </Flex>
  );
});
