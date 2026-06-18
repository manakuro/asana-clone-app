import type { TooltipContentProps } from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'react';
import {
  Tooltip as ChakraTooltip,
  type TooltipProps as ChakraTooltipProps,
} from '@/chakra-ui/ui/tooltip';
import { Flex } from '@/components/ui/flex';

type Props = ChakraTooltipProps & {
  withIcon?: boolean;
  size?: Sizes;
  ref?: React.ForwardedRef<any>;
  contentProps?: TooltipContentProps;
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

export const Tooltip = forwardRef<HTMLDivElement, Props>(
  function Tooltip(props, ref) {
    const { size, withIcon, contentProps, ...rest } = props;
    const sizeStyle = size ? sizes[size as Sizes] : {};
    const tooltipContentProps: TooltipContentProps = {
      py: 2,
      px: 4,
      borderRadius: 'md',
      textAlign: 'center',
      color: 'white',
      bg: 'gray.fg',
      fontSize: 'xs',
      ...sizeStyle,
      ...contentProps,
    };

    if (withIcon) {
      // NOTE: Need to wrap Icon with span
      // @see https://github.com/chakra-ui/chakra-ui/issues/2869
      return (
        <ChakraTooltip
          contentProps={tooltipContentProps}
          ref={ref}
          {...rest}
          showArrow={false}
        >
          <Flex as="span" alignItems="center">
            {props.children}
          </Flex>
        </ChakraTooltip>
      );
    }

    return (
      <ChakraTooltip
        contentProps={tooltipContentProps}
        ref={ref}
        {...rest}
        showArrow={false}
      />
    );
  },
);
