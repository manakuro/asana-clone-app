'use client';

import { memo, type PropsWithChildren, type ReactNode } from 'react';
import { Flex } from '@/components/ui/flex';
import { Head } from '@/components/ui/head';
import { Stack } from '@/components/ui/stack';
import { TasksContext } from '@/features/task/components/tasks-provider/tasks-context';
import { useHomePageQuery } from './api/use-home-page-query';
import { Content } from './components/content';
import { FavoriteProjects } from './components/favorite-projects';
import { Header } from './components/header';
import { RecentProjects } from './components/recent-projects';
import { SkeletonHome } from './components/skeleton-home';
import { TasksDueSoon } from './components/tasks-due-soon';

type Props = PropsWithChildren<{
  task?: ReactNode;
}>;

export const Page = memo(function Container({ task }: Props) {
  const { loading } = useHomePageQuery();

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
      {task}
    </TasksContext>
  );
});
