import type { MyTasksPageQuery } from '@/graphql/types';

export type MyTasksResponse = NonNullable<MyTasksPageQuery>;
export type MyTasksTeammateTaskSectionResponse = NonNullable<
  EdgesNode<MyTasksResponse['teammateTaskSections']>
>;
