import { type IconType, icons } from '@/shared/icons';
import {
  Icon as ChakraIcon,
  type IconProps as ChakraIconProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraIconProps & {
  icon: IconType;
  size?: Sizes;
  ref?: React.ForwardedRef<any>;
};
export type IconProps = Props;

const sizes = {
  '3xl': {
    w: 10,
    h: 10,
  },
  '2xl': {
    w: 8,
    h: 8,
  },
  xl: {
    w: 6,
    h: 6,
  },
  lg: {
    w: '1.5em',
    h: '1.5em',
  },
  md: {
    w: '1.25em',
    h: '1.25em',
  },
  sm: {
    w: '1.15em',
    h: '1.15em',
  },
  xs: {
    w: '1em',
    h: '1em',
  },
} as const;
type Sizes = keyof typeof sizes;

export const Icon = forwardRef<SVGElement, Props>(function Icon(props, ref) {
  const { size, icon, ...iconProps } = props;
  const iconComponent = icons[icon];
  const sizeStyle = sizes[size ?? 'md'];

  return (
    <ChakraIcon
      ref={ref}
      as={iconComponent}
      color="whiteAlpha"
      {...sizeStyle}
      {...iconProps}
    />
  );
});
