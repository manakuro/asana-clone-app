import { memo } from 'react';
import { ColorBox } from '@/components/ui/color-box';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import type { Mention } from '@/features/editor/store/mention';
import { useProject } from '@/features/project/store/project';
import { useProjectBaseColor } from '@/features/project/store/project-base-color';
import { LeftContainer } from './left-container';
import { RightContainer } from './right-container';

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
        <Text fontSize="sm" w="80%" lineClamp={1}>
          {props.mention.title}
        </Text>
      </RightContainer>
    </Flex>
  );
});
