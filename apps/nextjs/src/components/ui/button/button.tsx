import {
  Button as ChakraButton,
  type ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useLinkHoverStyle } from '@/hooks';

type Props = ChakraButtonProps & {
  lightBg?: boolean;
};
export type ButtonProps = Props;

export const Button = forwardRef<HTMLButtonElement, Props>(
  function Button(props, ref) {
    const { lightBg, ...rest } = props;
    const { selectedStyle: _, ...linkHoverStyle } = useLinkHoverStyle();
    const style = {
      ...(lightBg ? linkHoverStyle : {}),
    };

    return (
      <ChakraButton
        minH={7}
        fontWeight="normal"
        outline="none; !important"
        {...style}
        {...rest}
        ref={ref}
      />
    );
  },
);
