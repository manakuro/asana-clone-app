import { memo } from 'react';
import { TaskDetailModal } from '@/components/features/TaskDetails';
import { TasksProvider } from '@/components/features/Tasks';
import { Flex } from '@/components/ui/flex';
import { Head } from '@/components/ui/head';
import { Stack } from '@/components/ui/stack';
import { getHomeDetailId, isHomeDetailURL, useRouter } from '@/router';
import { Content } from './components/Content';
import { FavoriteProjects } from './components/FavoriteProjects';
import { Header } from './components/Header';
import { RecentProjects } from './components/RecentProjects';
import { SkeletonHome } from './components/SkeletonHome';
import { TasksDueSoon } from './components/TasksDueSoon';
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
    <TasksProvider isHomePage>
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
    </TasksProvider>
  );
});
