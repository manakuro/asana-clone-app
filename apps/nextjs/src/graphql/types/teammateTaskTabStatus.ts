import type { TeammateTaskTabStatusQuery } from '@/graphql/types';

export type {
  TeammateTaskTabStatusQuery,
  TeammateTaskTabStatusQueryVariables,
} from '@/graphql/types';

export type TeammateTaskTabStatusResponse = NonNullable<
  TeammateTaskTabStatusQuery['teammateTaskTabStatus']
>;
