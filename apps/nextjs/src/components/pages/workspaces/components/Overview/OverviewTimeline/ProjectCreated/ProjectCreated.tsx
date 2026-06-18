import { memo, useMemo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { formatCreatedAt } from '@/shared/date';
import { useProject } from '@/store/entities/project';
import { useTeammate } from '@/store/entities/teammate';

type Props = {
  projectId: string;
};

export const ProjectCreated = memo(function ProjectCreated(props: Props) {
  const { projectId } = props;
  const { project } = useProject(projectId);
  const { teammate } = useTeammate(project.createdBy);
  const name = useMemo(() => teammate.name, [teammate.name]);

  return (
    <Flex position="relative">
      <Flex flexDirection="column">
        <Icon icon="outlineProject" color="fg.muted" size="xl" ml="-1px" />
      </Flex>
      <Flex flexDirection="column" ml={2} mb={8}>
        <Heading as="h5" size="sm">
          Project created
        </Heading>
        <Flex mt={1}>
          <Text fontSize="xs" fontWeight="bold">
            {name}
          </Text>
          <Text ml={2} fontSize="xs" color="fg.muted">
            {formatCreatedAt(project.createdAt)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
});
