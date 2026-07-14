import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { TasksContainer } from '@/features/task/components/tasks-container/tasks-container';
import { useWorkspacesPageContext } from '../../contexts/context';
import { DescriptionSection } from './description-section';
import { MembersSection } from './members-section';
import { OverviewLeft } from './overview-left';
import { OverviewLeftContent } from './overview-left-content';
import { OverviewRight } from './overview-right';
import { OverviewRightContent } from './overview-right-content';
import { ProjectsSection } from './projects-section';
import { SkeletonOverview } from './skeleton-overview';

export const Overview = memo(function Overview() {
  return (
    <TasksContainer isProjectsPage>
      <Component />
    </TasksContainer>
  );
});

const Component = memo(function Component() {
  const { loadingTabContent } = useWorkspacesPageContext();

  if (loadingTabContent) return <SkeletonOverview />;

  return (
    <Flex flex={1} h="full" maxW="full" justifyContent="center">
      <OverviewLeft mt={12}>
        <OverviewLeftContent>
          <DescriptionSection />
          <MembersSection />
        </OverviewLeftContent>
      </OverviewLeft>
      <OverviewRight mt={12} pl={8}>
        <OverviewRightContent>
          <ProjectsSection />
        </OverviewRightContent>
      </OverviewRight>
    </Flex>
  );
});
