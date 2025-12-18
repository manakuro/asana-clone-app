import { useMemo } from 'react';
import type { ChakraProps, Colors } from '@/shared/chakra';
import { transitions } from '@/styles';

export type UseHoverProps = {
  light?: boolean;
  color?: Colors;
};

export const useLinkHoverStyle = (
  props?: UseHoverProps,
): ChakraProps & { selectedStyle: { bg: 'navigation.selected' } } => {
  const bg =
    props?.color ||
    (props?.light ? 'navigation.hover.light' : 'navigation.hover.dark');

  return useMemo(
    () => ({
      _hover: {
        bg,
      },
      selectedStyle: { bg: 'navigation.selected' },
      _active: { bg: 'navigation.selected' },
      transition: transitions.base(),
    }),
    [bg],
  );
};
