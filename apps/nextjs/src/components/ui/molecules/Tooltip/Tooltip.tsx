import {
  Tooltip as ChakraTooltip,
  type TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react';
import type React from 'react';
import { Flex } from 'src/components/ui/atoms';
import { forwardRef } from 'src/shared/chakra';

type Props = ChakraTooltipProps & {
  withIcon?: boolean;
  size?: Sizes;
  ref?: React.ForwardedRef<any>;
};
export type TooltipProps = Props;

const sizes = {
  lg: {
    w: '200px',
  },
  md: {
    w: '160px',
  },
  sm: {
    w: '120px',
  },
} as const;
type Sizes = keyof typeof sizes;

export const Tooltip: React.FC<Props> & { id?: string } = forwardRef<
  Props,
  'div'
>((props, ref) => {
  const { size, withIcon, ...rest } = props;
  const sizeStyle = size ? sizes[size as Sizes] : {};
  const tooltipProps: ChakraTooltipProps = {
    py: 2,
    px: 4,
    borderRadius: 'md',
    textAlign: 'center',
    color: 'white',
    bg: 'gray.800',
    fontSize: 'xs',
    ...sizeStyle,
    ...rest,
  };

  if (props.withIcon) {
    // NOTE: Need to wrap Icon with span
    // @see https://github.com/chakra-ui/chakra-ui/issues/2869
    return (
      <ChakraTooltip {...tooltipProps} ref={ref}>
        <Flex as="span" alignItems="center">
          {props.children}
        </Flex>
      </ChakraTooltip>
    );
  }

  return <ChakraTooltip {...tooltipProps} ref={ref} />;
});

Tooltip.id = 'Tooltip';
