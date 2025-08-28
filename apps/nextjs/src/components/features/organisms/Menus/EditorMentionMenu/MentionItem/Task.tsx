import { CheckIcon, Flex, type FlexProps, Text } from '@/components/ui/atoms';
import type { Mention } from '@/store/entities/mention';
import { useProject } from '@/store/entities/project';
import { memo } from 'react';
import { LeftContainer } from './LeftContainer';
import { RightContainer } from './RightContainer';

type Props = FlexProps & {
  mention: Mention;
};

export const Task = memo(function Task(props: Props) {
  const { project } = useProject(props.mention.projectId);

  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <CheckIcon completed={props.mention.completed} />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm" maxW="80%" noOfLines={1}>
          {props.mention.title}
        </Text>
        <Text ml={5} fontSize="xs" color="text.muted">
          {project.name}
        </Text>
      </RightContainer>
    </Flex>
  );
});
