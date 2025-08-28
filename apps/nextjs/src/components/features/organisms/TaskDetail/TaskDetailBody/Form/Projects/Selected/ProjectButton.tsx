import { Box, Button, Flex, Text } from '@/components/ui/atoms';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';

type Props = {
  projectId: string;
};

export function ProjectButton(props: Props) {
  const { project } = useProject(props.projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);

  return (
    <Button
      as={Box}
      variant="ghost"
      size="sm"
      cursor="pointer"
      h={6}
      minH={6}
      borderRadius="full"
    >
      <Flex alignItems="center">
        <Box
          ml={1}
          w={2}
          h={2}
          bg={projectBaseColor.color.color}
          borderRadius="sm"
        />
        <Text fontSize="xs" flex={1} ml={2}>
          {project.name}
        </Text>
      </Flex>
    </Button>
  );
}
