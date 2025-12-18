import { useMemo } from 'react';
import type { ChakraProps } from '@/shared/chakra';
import { transitions } from '@/styles';

export const useClickableHoverStyle = () => {
  const defaultStyle = useMemo<ChakraProps>(
    () => ({
      _hover: {
        bg: 'gray.50',
      },
      transition: transitions.base('background'),
      cursor: 'pointer',
    }),
    [],
  );
  const lightStyle = useMemo<ChakraProps>(
    () => ({
      opacity: 0.7,
      _hover: {
        opacity: 1,
      },
      transition: transitions.base('opacity'),
      cursor: 'pointer',
    }),
    [],
  );

  const inputGrabbableStyle = useMemo<ChakraProps>(
    () => ({
      _hover: {
        borderColor: 'gray.300',
        boxShadow: 'lg',
      },
      transition: transitions.base(),
      cursor: 'pointer',
    }),
    [],
  );

  const textStyle = useMemo<ChakraProps>(
    () => ({
      _hover: { color: 'teal.300' },
      transition: transitions.base(),
      cursor: 'pointer',
    }),
    [],
  );

  return {
    clickableHoverStyle: defaultStyle,
    clickableHoverLightStyle: lightStyle,
    clickableHoverInputGrabbableStyle: inputGrabbableStyle,
    clickableHoverTextStyle: textStyle,
  };
};
