import { ColorBox, Flex, type FlexProps, Text } from '@/components/ui/atoms';
import type { Mention } from '@/store/entities/mention';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';
import { memo } from 'react';
import { LeftContainer } from './LeftContainer';
import { RightContainer } from './RightContainer';

type Props = FlexProps & {
  mention: Mention;
};

export const Project = memo(function Project(props: Props) {
  const { project } = useProject(props.mention.projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);

  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <ColorBox size="sm" color={projectBaseColor.color.color} />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm" w="80%" noOfLines={1}>
          {props.mention.title}
        </Text>
      </RightContainer>
    </Flex>
  );
});
