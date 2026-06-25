import type { ProjectTaskSectionsQuery } from '@/graphql/types';

export type ProjectTaskSectionResponse = NonNullable<
  EdgesNode<ProjectTaskSectionsQuery['projectTaskSections']>
>;
