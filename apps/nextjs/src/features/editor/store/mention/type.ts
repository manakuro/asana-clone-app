import type { MentionResponse } from '@/graphql/types/mention';

export const MentionType = {
  TEAMMATE: 1,
  TASK: 2,
  PROJECT: 3,
  WORKSPACE: 4,
} as const;
export type MentionTypeCode = ValueOf<typeof MentionType>;

export type Mention = Override<
  MentionResponse,
  {
    type: MentionTypeCode;
  }
>;
