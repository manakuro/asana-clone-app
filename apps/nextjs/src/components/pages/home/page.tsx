'use client';

import { memo, useCallback } from 'react';
import { Flex } from '@/components/ui/flex';
import { Head } from '@/components/ui/head';
import { Stack } from '@/components/ui/stack';
import { useMe } from '@/features/me/store/me';
import { TasksContext } from '@/features/task/components/tasks-provider/tasks-context';
import { TaskDetailModal } from '@/features/task-detail/components/task-detail-modal';
import { getHomeDetailId, isHomeDetailURL, useRouter } from '@/router';
import { useHomePageQuery } from './api/use-home-page-query';
import { useHomeTaskDetailPageQuery } from './api/use-home-task-detail-page-query';
import { Content } from './components/content';
import { FavoriteProjects } from './components/favorite-projects';
import { Header } from './components/header';
import { RecentProjects } from './components/recent-projects';
import { SkeletonHome } from './components/skeleton-home';
import { TasksDueSoon } from './components/tasks-due-soon';
import { useHomeTaskDetail } from './hooks';

export const Page = memo(function Container() {
  const { loading } = useHomePageQuery();
  const { refetch } = useHomeTaskDetailPageQuery();
  const { me } = useMe();

  const fetchTaskDetailQuery = useCallback(
    async (variables: { taskId: string }) => {
      await refetch({ taskId: variables.taskId, teammateId: me.id });
    },
    [me.id, refetch],
  );

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
        {loading ? (
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
