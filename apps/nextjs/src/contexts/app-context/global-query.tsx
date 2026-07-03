import type { PropsWithChildren, ReactElement } from 'react';
import { useTeammateTaskTabStatusQuery } from '@/components/pages/my-tasks/api/use-teammate-task-tab-status-query';
import { PageLoader } from '@/components/ui/page-loader';
import { useFavoriteProjectIdsQuery } from '@/features/favorite-project/api/use-favorite-project-ids-query';
import { useFavoriteWorkspaceIdsQuery } from '@/features/favorite-workspace/api/use-favorite-workspace-ids-query';
import { useMeQuery } from '@/features/me/api/use-me-query';
import { useProjectBaseColorsQuery } from '@/features/project/api/use-project-base-colors-query';
import { useProjectIconsQuery } from '@/features/project/api/use-project-icons-query';
import { useProjectLightColorsQuery } from '@/features/project/api/use-project-light-colors-query';
import { useProjectsQuery } from '@/features/project/api/use-projects-query';
import { useTaskPrioritiesQuery } from '@/features/task/api/use-task-priorities-query';
import { useWorkspaceQuery } from '@/features/workspace/api/use-workspace-query';
import { useMe } from '@/store/entities/me';

export function GlobalQuery(props: PropsWithChildren) {
  useTaskPrioritiesQuery();
  useProjectsQuery();
  useProjectBaseColorsQuery();
  useProjectLightColorsQuery();
  useProjectIconsQuery();
  useFavoriteWorkspaceIdsQuery();
  useWorkspaceQuery();
  useMeQuery();
  useFavoriteProjectIdsQuery();
  useTeammateTaskTabStatusQuery();

  const { me } = useMe();

  if (!me.id) return <PageLoader />;

  return props.children as ReactElement;
}
