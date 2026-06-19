export const SHARE_INDEX = 'share' as const;
export const MEMBERS_INDEX = 'members' as const;

export type Index = typeof SHARE_INDEX | typeof MEMBERS_INDEX;
