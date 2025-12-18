import type { ProjectLightColorsQuery } from '@/graphql/types';

export type {
  ProjectLightColorsLazyQueryHookResult,
  ProjectLightColorsQueryHookResult,
} from '@/graphql/hooks';
export type {
  ProjectLightColorsQuery,
  ProjectLightColorsQueryVariables,
} from '@/graphql/types';

export type ProjectLightColorsResponse =
  ProjectLightColorsQuery['projectLightColors'];
