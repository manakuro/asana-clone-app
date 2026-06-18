import {
  IconButton as ChakraIconButton,
  type IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef, useMemo } from 'react';
import { useDisabledStyle, useLinkHoverStyle } from '@/hooks';
import type { SystemStyleObject } from '@/shared/chakra';

type Props = ChakraIconButtonProps & {
  light?: boolean;
  ref?: React.ForwardedRef<any>;
};
export type IconButtonProps = Props;

export const IconButton = forwardRef<HTMLButtonElement, Props>(
  function IconButton(props, ref) {
    const { light, disabled, ...rest } = props;
    const { selectedStyle: _, ...linkHoverStyle } = useLinkHoverStyle();
    const { disabledStyle } = useDisabledStyle();

    const style = useMemo(
      (): SystemStyleObject => ({
        ...(props.variant === 'ghost' ? { p: '0.4em' } : {}),
        ...(light ? linkHoverStyle : {}),
        ...(disabled ? { ...disabledStyle } : {}),
      }),
      // biome-ignore lint/correctness/useExhaustiveDependencies: used for styling
      [disabledStyle, disabled, light, linkHoverStyle, props.variant],
    );

    return (
      <ChakraIconButton
        cursor="pointer"
        minW={8}
        h={8}
        borderRadius="md"
        css={style}
        {...rest}
        ref={ref}
      />
    );
  },
);
