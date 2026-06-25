import type { FavoriteWorkspaceIdsQuery } from '@/graphql/types';

export type FavoriteWorkspaceIdsResponse = NonNullable<
  FavoriteWorkspaceIdsQuery['favoriteWorkspaceIds']
>;

export type { FavoriteWorkspaceIdsUpdatedSubscription as FavoriteWorkspaceIdsUpdatedSubscriptionResponse } from '@/graphql/types';
