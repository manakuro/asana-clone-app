import { useMemo } from 'react';
import type { ChakraProps } from '@/shared/chakra';

type Props = ChakraProps;

export const useLinkStyle = (props?: Props) => {
  const style = useMemo<ChakraProps>(
    () => ({
      color: 'cyan.400',
      cursor: 'pointer',
      fontSize: 'sm',
      _hover: {
        textDecoration: 'underline !important',
      },
      ...props,
    }),
    [props],
  );

  const styleHover = useMemo<ChakraProps>(
    () => ({
      cursor: 'pointer',
      _hover: {
        color: 'cyan.400',
      },
      ...props,
    }),
    [props],
  );

  return {
    style,
    styleHover,
  };
};
