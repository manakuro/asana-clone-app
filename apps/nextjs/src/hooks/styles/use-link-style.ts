import { useMemo } from 'react';
import type { SystemStyleObject } from '@/shared/chakra';

type Props = SystemStyleObject;

export const useLinkStyle = (props?: Props) => {
  const style = useMemo<SystemStyleObject>(
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

  const styleHover = useMemo<SystemStyleObject>(
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
