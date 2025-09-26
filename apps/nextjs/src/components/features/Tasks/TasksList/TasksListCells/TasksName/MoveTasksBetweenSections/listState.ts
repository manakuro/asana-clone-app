export const TODAY = '1' as const;
export const UPCOMING = '2' as const;
export const LATER = '3' as const;

export type ListStatus = typeof TODAY | typeof UPCOMING | typeof LATER;
