import type { FavoriteWorkspaceIdsResponse } from '@/graphql/types/favoriteWorkspaceIds';

export type {
  FavoriteWorkspaceIdsResponse,
  FavoriteWorkspaceIdsUpdatedSubscriptionResponse,
} from '@/graphql/types/favoriteWorkspaceIds';

export type FavoriteWorkspaceId = FavoriteWorkspaceIdsResponse[number];
