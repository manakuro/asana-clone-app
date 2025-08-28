import { PageLoader } from '@/components/ui/molecules';
import {
  useFavoriteProjectIdsQuery,
  useFavoriteWorkspaceIdsQuery,
  useMeQuery,
  useProjectBaseColorsQuery,
  useProjectIconsQuery,
  useProjectLightColorsQuery,
  useProjectsQuery,
  useTaskPrioritiesQuery,
  useTeammateTaskTabStatusQuery,
  useWorkspaceQuery,
} from '@/hooks/queries/entities';
import { useMe } from '@/store/entities/me';
import type { PropsWithChildren, ReactElement } from 'react';

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
