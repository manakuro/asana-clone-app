import { atomWithReset } from 'jotai/utils';

export const favoriteProjectIdsState = atomWithReset<string[]>([]);
