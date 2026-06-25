import type { TaskLikesQuery } from '@/graphql/types';

export type TaskLikesQueryResponse = NonNullable<TaskLikesQuery['taskLikes']>;
