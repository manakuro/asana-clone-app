import type { FavoriteProjectIdsResponse } from '@/graphql/types/favorite-project-ids';

export type {
  FavoriteProjectIdsResponse,
  FavoriteProjectIdsUpdatedSubscriptionResponse,
} from '@/graphql/types/favorite-project-ids';

export type FavoriteProjectId = FavoriteProjectIdsResponse[number];
