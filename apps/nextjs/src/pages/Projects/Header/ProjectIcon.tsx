import { Flex, Icon } from '@/components/ui/atoms';
import type { IconType } from '@/shared/icons';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';
import { useProjectIcon } from '@/store/entities/projectIcon';
import { memo } from 'react';

export const ProjectIcon = memo(function ProjectIcon() {
  const { projectId } = useProjectsProjectId();
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);
  const { projectIcon } = useProjectIcon(project.projectIconId);

  return (
    <Flex alignItems="center">
      <Flex
        borderRadius="lg"
        w={12}
        h={12}
        bg={projectBaseColor.color.color}
        color="white"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Icon size="lg" icon={projectIcon.icon.icon as IconType} />
      </Flex>
    </Flex>
  );
});
