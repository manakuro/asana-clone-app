import { useMemo } from 'react';
import type { SystemStyleObject } from '@/shared/chakra';

type Props = SystemStyleObject;

export const useDisabledStyle = (props?: Props) => {
  const disabledStyle = useMemo<SystemStyleObject>(
    () => ({
      opacity: '0.4',
      cursor: 'default',
      pointerEvents: 'none',
      ...props,
    }),
    [props],
  );

  return {
    disabledStyle,
  };
};
