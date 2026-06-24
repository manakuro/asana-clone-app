import type { ProjectTaskSectionResponse as Response } from '@/graphql/types/projectTaskSection';

export type {
  DeleteProjectTaskSectionAndDeleteTasksMutation,
  DeleteProjectTaskSectionAndKeepTasksMutation,
  ProjectTaskSectionCreatedSubscriptionResponse,
  ProjectTaskSectionDeletedAndDeleteTasksSubscriptionResponse,
  ProjectTaskSectionDeletedAndKeepTasksSubscriptionResponse,
  ProjectTaskSectionDeletedSubscriptionResponse,
  ProjectTaskSectionUndeletedAndDeleteTasksSubscriptionResponse,
  ProjectTaskSectionUndeletedAndKeepTasksSubscriptionResponse,
  ProjectTaskSectionUpdatedSubscriptionResponse,
} from '@/graphql/types/projectTaskSection';

export type ProjectTaskSectionResponse = Response & {
  isNew?: boolean;
};

export type ProjectTaskSection = Omit<
  ProjectTaskSectionResponse,
  'projectTasks'
> & {
  isNew?: boolean;
};
