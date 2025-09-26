export const SHARE_INDEX = 0 as const;
export const MEMBERS_INDEX = 1 as const;

export type Index = typeof SHARE_INDEX | typeof MEMBERS_INDEX;
