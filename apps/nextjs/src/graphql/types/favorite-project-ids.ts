import type { FavoriteProjectIdsQuery } from '@/graphql/types';

export type FavoriteProjectIdsResponse = NonNullable<
  FavoriteProjectIdsQuery['favoriteProjectIds']
>;

export type { FavoriteProjectIdsUpdatedSubscription as FavoriteProjectIdsUpdatedSubscriptionResponse } from '@/graphql/types';
