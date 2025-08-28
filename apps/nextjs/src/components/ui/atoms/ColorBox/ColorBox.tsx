import { Box, type BoxProps } from '@/components/ui/atoms';
import { forwardRef } from 'react';
import type React from 'react';

type Props = BoxProps & {
  ref?: React.ForwardedRef<any>;
  color: BoxProps['bgColor'];
  size: Sizes;
};
export type ColorBoxProps = Props;

const sizes = {
  lg: {
    w: 5,
    minW: 5,
    h: 5,
    minH: 5,
  },
  md: {
    w: 4,
    minW: 4,
    h: 4,
    minH: 4,
  },
  sm: {
    w: 3,
    minW: 3,
    h: 3,
    minH: 3,
  },
  xs: {
    w: 2,
    minW: 2,
    h: 2,
    minH: 2,
  },
} as const;
type Sizes = keyof typeof sizes;

export const ColorBox = forwardRef<HTMLDivElement, Props>(
  function ColorBox(props, ref) {
    const { size, color, ...rest } = props;
    const sizeStyle = sizes[size ?? 'md'];

    return (
      <Box {...sizeStyle} borderRadius="sm" bg={color} {...rest} ref={ref} />
    );
  },
);
