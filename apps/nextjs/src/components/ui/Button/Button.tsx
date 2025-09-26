import { useLinkHoverStyle } from '@/hooks';
import { forwardRef } from '@/shared/chakra';
import {
  Button as ChakraButton,
  type ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraButtonProps & {
  ref?: React.ForwardedRef<any>;
  lightBg?: boolean;
};
export type ButtonProps = Props;

export const Button = forwardRef<Props, 'button'>(function Button(props, ref) {
  const { lightBg, ...rest } = props;
  const { selectedStyle, ...linkHoverStyle } = useLinkHoverStyle();
  const style = {
    ...(lightBg ? linkHoverStyle : {}),
  };

  return (
    <ChakraButton
      minH={7}
      iconSpacing={1}
      fontWeight="normal"
      outline="none; !important"
      {...style}
      {...rest}
      ref={ref}
    />
  );
});

Button.id = 'Button';
