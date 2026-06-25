import type { ActivityTypeCode } from '@/graphql/enums';

export { ActivityTypeCode } from '@/graphql/enums';

export type ActivityTypeCodeValues = ValueOf<typeof ActivityTypeCode>;
export type ActivityTypeCodeKeys = keyof typeof ActivityTypeCode;
