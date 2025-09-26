import type { ChakraProps } from '@/shared/chakra';
import { useMemo } from 'react';

export const useTimelineStyle = () => {
  const timelineBorderStyle = useMemo(
    (): ChakraProps => ({
      _before: {
        border: '1px',
        borderStyle: 'dashed',
        borderColor: 'gray.400',
        borderRadius: 'md',
        position: 'absolute',
        bottom: 0,
        left: '9px',
        content: "''",
        w: 0,
        h: 8,
      },
    }),
    [],
  );

  return {
    timelineBorderStyle,
  };
};
