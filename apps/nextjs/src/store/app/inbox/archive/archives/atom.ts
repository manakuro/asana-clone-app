import { atom } from 'jotai';
import { dateFns } from '@/shared/dateFns';
import { createState } from '@/store/util';
import type { ArchiveActivity } from './type';

export const initialState = (): ArchiveActivity => ({
  id: '',
  type: 'TASK',
  updatedAt: '',
});

export const {
  state: archiveState,
  listState: archivesState,
  idsState: archiveIdsState,
} = createState({ initialState });

type ArchiveIdsSortByUpdatedAt = {
  today: string[];
  yesterday: string[];
  pastSevenDays: string[];
  earlier: string[];
};
export type ArchiveIdsSortByUpdatedAtKeys = keyof ArchiveIdsSortByUpdatedAt;

export const archiveIdsSortByUpdatedAtState = atom<ArchiveIdsSortByUpdatedAt>(
  (get) => {
    const archives = [...get(archivesState)];
    return archives
      .sort((a, b) => {
        return a.updatedAt < b.updatedAt ? -1 : 1;
      })
      .reduce<ArchiveIdsSortByUpdatedAt>(
        (acc, a) => {
          const duration = dateFns.intervalToDuration({
            start: new Date(),
            end: new Date(a.updatedAt),
          });

          if (dateFns.isToday(new Date(a.updatedAt))) {
            acc.today.push(a.id);
            return acc;
          }
          if (dateFns.isYesterday(new Date(a.updatedAt))) {
            acc.yesterday.push(a.id);
            return acc;
          }
          if (duration?.days && duration.days <= 7) {
            acc.pastSevenDays.push(a.id);
            return acc;
          }

          if (duration?.days && duration.days > 7) {
            acc.earlier.push(a.id);
          }

          return acc;
        },
        {
          today: [],
          yesterday: [],
          pastSevenDays: [],
          earlier: [],
        },
      );
  },
);
