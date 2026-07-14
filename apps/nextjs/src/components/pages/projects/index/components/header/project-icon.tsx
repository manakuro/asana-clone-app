import { memo } from 'react';
import { useProjectsProjectId } from '@/components/pages/projects/index/store/projects/project';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { useProject } from '@/features/project/store/project';
import { useProjectBaseColor } from '@/features/project/store/project-base-color';
import { useProjectIcon } from '@/features/project/store/project-icon';
import type { IconType } from '@/utils/icons';

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
