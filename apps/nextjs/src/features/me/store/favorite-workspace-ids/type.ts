import type { FavoriteWorkspaceIdsResponse } from '@/graphql/types/favorite-workspace-ids';

export type {
  FavoriteWorkspaceIdsResponse,
  FavoriteWorkspaceIdsUpdatedSubscriptionResponse,
} from '@/graphql/types/favorite-workspace-ids';

export type FavoriteWorkspaceId = FavoriteWorkspaceIdsResponse[number];
