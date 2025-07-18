import type React from 'react';
import { memo } from 'react';
import { Flex, type FlexProps, Icon, Text } from 'src/components/ui/atoms';
import type { Mention } from 'src/store/entities/mention';
import { useWorkspace } from 'src/store/entities/workspace';
import { LeftContainer } from './LeftContainer';
import { RightContainer } from './RightContainer';

type Props = FlexProps & {
  mention: Mention;
};

export const Workspace: React.FC<Props> = memo<Props>(() => {
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
Workspace.displayName = 'Workspace';
