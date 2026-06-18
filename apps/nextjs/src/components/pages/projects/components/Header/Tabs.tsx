import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Heading } from '@/components/ui/heading';
import { Tab, TabList } from '@/components/ui/tabs';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useProject } from '@/store/entities/project';
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
          <Heading as="h2" size="lg" fontWeight="semibold">
            {project.name}
          </Heading>
          <MoreActionIconButton projectId={projectId} />
          <ProjectDetailIconButton projectId={projectId} />
          <FavoriteIconButton projectId={projectId} />
        </Flex>
        <TabList bottom="-1px">
          <Tab value="overview">Overview</Tab>
          <Tab value="list">List</Tab>
          <Tab value="board">Board</Tab>
          <Tab disabled cursor="auto !important" value="timeline">
            Timeline
          </Tab>
          <Tab value="calendar">Calendar</Tab>
          <Tab disabled cursor="auto !important" value="dashboard">
            Dashboard
          </Tab>
          <Tab value="files">Files</Tab>
        </TabList>
      </Flex>
    </Flex>
  );
});
