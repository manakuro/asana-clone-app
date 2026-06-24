import type { FavoriteProjectIdsResponse } from '@/graphql/types/favoriteProjectIds';

export type {
  FavoriteProjectIdsResponse,
  FavoriteProjectIdsUpdatedSubscriptionResponse,
} from '@/graphql/types/favoriteProjectIds';

export type FavoriteProjectId = FavoriteProjectIdsResponse[number];
