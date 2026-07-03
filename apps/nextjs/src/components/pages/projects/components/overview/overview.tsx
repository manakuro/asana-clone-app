import { memo } from 'react';
import { useProjectsPageContext } from '@/components/pages/projects/contexts/context';
import { Flex } from '@/components/ui/flex';
import { TasksContainer } from '@/features/task/components/tasks-container/tasks-container';
import { OverviewContent } from './overview-content';
import { OverviewLeft } from './overview-left';
import { OverviewLeftContent } from './overview-left-content';
import { OverviewRight } from './overview-right';
import { OverviewRightContent } from './overview-right-content';
import { OverviewTimeline } from './overview-timeline';
import { SkeletonOverview } from './skeleton-overview';

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
