import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import type { Mention } from '@/store/entities/mention';
import { useWorkspace } from '@/store/entities/workspace';
import { LeftContainer } from './LeftContainer';
import { RightContainer } from './RightContainer';

type Props = FlexProps & {
  mention: Mention;
};

export const Workspace = memo(function Workspace(_props: Props) {
  const { workspace } = useWorkspace();

  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <Icon icon="group" color="fg.muted" />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm" w="80%" lineClamp={1}>
          {workspace.name}
        </Text>
      </RightContainer>
    </Flex>
  );
});
