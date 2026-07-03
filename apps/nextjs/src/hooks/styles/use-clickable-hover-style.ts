import { useMemo } from 'react';
import type { SystemStyleObject } from '@/lib/chakra';
import { transitions } from '@/styles/transitions';

export const useClickableHoverStyle = () => {
  const defaultStyle = useMemo<SystemStyleObject>(
    () => ({
      _hover: {
        bg: 'gray.50',
      },
      transition: transitions.base('background'),
      cursor: 'pointer',
    }),
    [],
  );
  const lightStyle = useMemo<SystemStyleObject>(
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

  const inputGrabbableStyle = useMemo<SystemStyleObject>(
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

  const textStyle = useMemo<SystemStyleObject>(
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
