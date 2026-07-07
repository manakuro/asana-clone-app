import { atomWithReset } from 'jotai/utils';

export const favoriteWorkspaceIdsState = atomWithReset<string[]>([]);
