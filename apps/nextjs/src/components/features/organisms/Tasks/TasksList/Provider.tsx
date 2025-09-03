import { useTasksListContentSticky } from '@/components/features/organisms/Tasks';
import type { ChakraProps } from '@/shared/chakra';
import { createProvider } from '@/shared/react/createProvider';
import { useMemo } from 'react';

type ContextProps = {
  stickyStyle: StickyStyle;
};
type StickyStyle = Override<
  ChakraProps,
  {
    zIndex?: number;
  }
>;

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
export const { Provider, useContext: useTasksListContext } = createProvider(
  useValue,
  '@/components/organisms/Tasks/TasksList/Provider.tsx',
);
