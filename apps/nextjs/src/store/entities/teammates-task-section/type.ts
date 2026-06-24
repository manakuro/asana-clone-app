import type { TeammateTaskSectionResponse as Response } from '@/graphql/types/teammateTaskSection';

export type {
  DeleteTeammateTaskSectionAndDeleteTasksMutation,
  DeleteTeammateTaskSectionAndKeepTasksMutation,
  TeammateTaskSectionCreatedSubscriptionResponse,
  TeammateTaskSectionDeletedAndDeleteTasksSubscriptionResponse,
  TeammateTaskSectionDeletedAndKeepTasksSubscriptionResponse,
  TeammateTaskSectionDeletedSubscriptionResponse,
  TeammateTaskSectionUndeletedAndDeleteTasksSubscriptionResponse,
  TeammateTaskSectionUndeletedAndKeepTasksSubscriptionResponse,
  TeammateTaskSectionUpdatedSubscriptionResponse,
  UpdateTeammateTaskSectionInput,
} from '@/graphql/types/teammateTaskSection';

export type TeammateTaskSectionResponse = Response & {
  isNew?: boolean;
};

export type TeammateTaskSection = Omit<
  TeammateTaskSectionResponse,
  'teammateTasks'
> & {
  isNew?: boolean;
};
