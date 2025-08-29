import { TasksContainer } from '@/components/features/organisms/Tasks';
import { Flex } from '@/components/ui/atoms';
import { memo } from 'react';
import { useWorkspacesPageContext } from '../Provider';
import { DescriptionSection } from './DescriptionSection';
import { MembersSection } from './MembersSection';
import { OverviewLeft } from './OverviewLeft';
import { OverviewLeftContent } from './OverviewLeftContent';
import { OverviewRight } from './OverviewRight';
import { OverviewRightContent } from './OverviewRightContent';
import { ProjectsSection } from './ProjectsSection';
import { SkeletonOverview } from './SkeletonOverview';

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
