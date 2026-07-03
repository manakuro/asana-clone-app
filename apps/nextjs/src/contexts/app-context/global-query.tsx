import type { PropsWithChildren, ReactElement } from 'react';
import { PageLoader } from '@/components/ui/page-loader';
import { useFavoriteProjectIdsQuery } from '@/hooks/queries/use-favorite-project-ids-query';
import { useFavoriteWorkspaceIdsQuery } from '@/hooks/queries/use-favorite-workspace-ids-query';
import { useMeQuery } from '@/hooks/queries/use-me-query';
import { useProjectBaseColorsQuery } from '@/hooks/queries/use-project-base-colors-query';
import { useProjectIconsQuery } from '@/hooks/queries/use-project-icons-query';
import { useProjectLightColorsQuery } from '@/hooks/queries/use-project-light-colors-query';
import { useProjectsQuery } from '@/hooks/queries/use-projects-query';
import { useTaskPrioritiesQuery } from '@/hooks/queries/use-task-priorities-query';
import { useTeammateTaskTabStatusQuery } from '@/hooks/queries/use-teammate-task-tab-status-query';
import { useWorkspaceQuery } from '@/hooks/queries/use-workspace-query';
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
