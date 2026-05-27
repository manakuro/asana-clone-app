import type { TestUsersQuery } from '@/graphql/types';

export type {
  TestUsersQuery,
  TestUsersQueryVariables,
} from '@/graphql/types';

export type TestUser = NonNullable<EdgesNode<TestUsersQuery['testUsers']>>;
export type TestUsersPageInfo = PageInfo<TestUsersQuery['testUsers']>;
