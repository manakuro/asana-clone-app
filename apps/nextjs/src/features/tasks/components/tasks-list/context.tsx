import { useMemo } from 'react';
import { useTasksListContentSticky } from '@/features/tasks/components/tasks-list/tasks-list-content/use-tasks-list-content-sticky';
import type { SystemStyleObject } from '@/shared/chakra';
import { createContext } from '@/shared/react/create-context';

type ContextProps = {
  stickyStyle: StickyStyle;
};
type StickyStyle = SystemStyleObject;

const useValue = (): ContextProps => {
  const { isStickyVertical } = useTasksListContentSticky();
  const stickyStyle = useMemo((): StickyStyle => {
    if (isStickyVertical)
      return {
        position: 'sticky',
        left: 0,
        zIndex: 100,
        bg: 'white',
      };

    return {};
  }, [isStickyVertical]);
  return {
    stickyStyle,
  } as const;
};
export const { Context, useContext: useTasksListContext } = createContext(
  useValue,
  '@/components/features/tasks/tasks-list/context.tsx',
);
