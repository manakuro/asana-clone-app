import type { ProjectBaseColorsQuery } from '@/graphql/types';

export type {
  ProjectBaseColorsLazyQueryHookResult,
  ProjectBaseColorsQueryHookResult,
} from '@/graphql/hooks';
export type {
  ProjectBaseColorsQuery,
  ProjectBaseColorsQueryVariables,
} from '@/graphql/types';

export type ProjectBaseColorsResponse =
  ProjectBaseColorsQuery['projectBaseColors'];
