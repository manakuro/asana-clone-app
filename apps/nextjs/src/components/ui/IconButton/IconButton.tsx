import {
  IconButton as ChakraIconButton,
  type IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef, useMemo } from 'react';
import { useDisabledStyle, useLinkHoverStyle } from '@/hooks';
import type { ChakraProps } from '@/shared/chakra';

type Props = ChakraIconButtonProps & {
  light?: boolean;
  ref?: React.ForwardedRef<any>;
};
export type IconButtonProps = Props;

export const IconButton = forwardRef<HTMLButtonElement, Props>(
  function IconButton(props, ref) {
    const { light, isDisabled, ...rest } = props;
    const { selectedStyle: _, ...linkHoverStyle } = useLinkHoverStyle();
    const { disabledStyle } = useDisabledStyle();

    const style = useMemo(
      (): ChakraProps => ({
        ...(props.variant === 'ghost' ? { p: '0.4em' } : {}),
        ...(light ? linkHoverStyle : {}),
        ...(isDisabled ? { ...disabledStyle } : {}),
      }),
      // biome-ignore lint/correctness/useExhaustiveDependencies: used for styling
      [disabledStyle, isDisabled, light, linkHoverStyle, props.variant],
    );

    return (
      <ChakraIconButton
        as="div"
        cursor="pointer"
        minW={8}
        h={8}
        borderRadius="md"
        {...style}
        {...rest}
        ref={ref}
      />
    );
  },
);
