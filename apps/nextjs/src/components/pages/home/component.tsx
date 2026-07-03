import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Head } from '@/components/ui/head';
import { Stack } from '@/components/ui/stack';
import { TasksContext } from '@/features/task/components/tasks-provider/tasks-context';
import { TaskDetailModal } from '@/features/task-details/components/task-detail-modal';
import { getHomeDetailId, isHomeDetailURL, useRouter } from '@/router';
import { Content } from './components/content';
import { FavoriteProjects } from './components/favorite-projects';
import { Header } from './components/header';
import { RecentProjects } from './components/recent-projects';
import { SkeletonHome } from './components/skeleton-home';
import { TasksDueSoon } from './components/tasks-due-soon';
import { useHomeTaskDetail } from './hooks';

type Props = {
  loading: boolean;
  fetchTaskDetailQuery: (variables: { taskId: string }) => Promise<void>;
};

export const Component = memo<Props>(function Component(props) {
  const { fetchTaskDetailQuery } = props;
  const { navigateToHome } = useRouter();

  useHomeTaskDetail({
    isTaskDetailURL: isHomeDetailURL,
    getTaskDetailId: getHomeDetailId,
    fetchQuery: fetchTaskDetailQuery,
  });

  return (
    <TasksContext isHomePage>
      <Flex flexDirection="column">
        <Head title="Home" />
        <Header />
        {props.loading ? (
          <SkeletonHome />
        ) : (
          <Content>
            <Stack gap={10} w="full">
              <TasksDueSoon />
              <FavoriteProjects />
              <RecentProjects />
            </Stack>
          </Content>
        )}
      </Flex>
      <TaskDetailModal backToPage={navigateToHome} />
    </TasksContext>
  );
});
