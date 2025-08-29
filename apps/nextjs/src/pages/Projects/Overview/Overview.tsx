import { TasksContainer } from '@/components/features/organisms/Tasks';
import { Flex } from '@/components/ui/atoms';
import { useProjectsPageContext } from '@/pages/Projects/Provider';
import { memo } from 'react';
import { OverviewContent } from './OverviewContent';
import { OverviewLeft } from './OverviewLeft';
import { OverviewLeftContent } from './OverviewLeftContent';
import { OverviewRight } from './OverviewRight';
import { OverviewRightContent } from './OverviewRightContent';
import { OverviewTimeline } from './OverviewTimeline';
import { SkeletonOverview } from './SkeletonOverview';

export const Overview = memo(function Overview() {
  return (
    <TasksContainer isProjectsPage>
      <Component />
    </TasksContainer>
  );
});

const Component = memo(function Component() {
  const { tabContentLoading } = useProjectsPageContext();

  if (tabContentLoading) return <SkeletonOverview />;

  return (
    <Flex flex={1} h="full" maxW="full">
      <OverviewLeft>
        <OverviewLeftContent>
          <OverviewContent />
        </OverviewLeftContent>
      </OverviewLeft>
      <OverviewRight>
        <OverviewRightContent>
          <OverviewTimeline />
        </OverviewRightContent>
      </OverviewRight>
    </Flex>
  );
});
