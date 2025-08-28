import { TaskDetailModal } from '@/components/features/organisms/TaskDetails';
import { TasksProvider } from '@/components/features/organisms/Tasks';
import { Flex, Stack } from '@/components/ui/atoms';
import { Head } from '@/components/ui/atoms/Head';
import { getHomeDetailId, isHomeDetailURL, useRouter } from '@/router';
import { memo } from 'react';
import { Content } from './Content';
import { FavoriteProjects } from './FavoriteProjects';
import { Header } from './Header';
import { RecentProjects } from './RecentProjects';
import { SkeletonHome } from './SkeletonHome';
import { TasksDueSoon } from './TasksDueSoon';
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
            <Stack spacing={10} w="full">
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
