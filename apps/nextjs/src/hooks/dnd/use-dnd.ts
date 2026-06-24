import type { DropResult } from '@hello-pangea/dnd';
import { useCallback, useState } from 'react';

const sort = <T>(list: T[], startIndex: number, endIndex: number): T[] => {
  const arr = Array.from(list);
  const [deleted] = arr.splice(startIndex, 1);
  arr.splice(endIndex, 0, deleted);

  return arr;
};

export const useDnd = <T>(defaultList: T[]) => {
  const [list, setList] = useState<T[]>(defaultList);

  const handleDnd = useCallback(
    (result: DropResult) => {
      if (
        !result.destination ||
        result.destination.index === result.source.index
      ) {
        return;
      }

      const sorted = sort(list, result.source.index, result.destination.index);
      setList(sorted);
    },
    [list],
  );

  return {
    handleDnd,
    list,
  };
};
