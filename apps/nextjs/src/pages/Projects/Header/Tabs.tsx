import { Flex, Heading } from '@/components/ui/atoms';
import { Tab, TabList } from '@/components/ui/organisms/Tabs';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useProject } from '@/store/entities/project';
import { memo } from 'react';
import { FavoriteIconButton } from './FavoriteIconButton';
import { MoreActionIconButton } from './MoreActionIconButton';
import { ProjectDetailIconButton } from './ProjectDetailIconButton';

export const Tabs = memo(function Tabs() {
  const { projectId } = useProjectsProjectId();
  const { project } = useProject(projectId);

  return (
    <Flex ml={4} mt={3} flex={1}>
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center">
          <Heading as="h2" size="md" fontWeight="semibold">
            {project.name}
          </Heading>
          <MoreActionIconButton projectId={projectId} />
          <ProjectDetailIconButton projectId={projectId} />
          <FavoriteIconButton projectId={projectId} />
        </Flex>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>List</Tab>
          <Tab>Board</Tab>
          <Tab isDisabled cursor="auto !important">
            Timeline
          </Tab>
          <Tab>Calendar</Tab>
          <Tab isDisabled cursor="auto !important">
            Dashboard
          </Tab>
          <Tab>Files</Tab>
        </TabList>
      </Flex>
    </Flex>
  );
});
