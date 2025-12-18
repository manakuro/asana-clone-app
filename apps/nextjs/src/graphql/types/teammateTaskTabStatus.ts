import type { TeammateTaskTabStatusQuery } from '@/graphql/types';

export type {
  TeammateTaskTabStatusLazyQueryHookResult,
  TeammateTaskTabStatusQueryHookResult,
} from '@/graphql/hooks';
export type {
  TeammateTaskTabStatusQuery,
  TeammateTaskTabStatusQueryVariables,
} from '@/graphql/types';

export type TeammateTaskTabStatusResponse = NonNullable<
  TeammateTaskTabStatusQuery['teammateTaskTabStatus']
>;
