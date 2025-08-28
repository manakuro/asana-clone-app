import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useMemo } from 'react';

type Props = ChakraLinkProps & {
  hover?: boolean;
};
export type LinkProps = ChakraLinkProps;

export const Link = forwardRef<HTMLAnchorElement, Props>(
  function Link(props, ref) {
    const { hover, ...rest } = props;

    const style = useMemo(
      () => ({
        ...(hover ? { _hover: { color: 'cyan.400' } } : {}),
      }),
      [hover],
    );

    return <ChakraLink {...style} {...rest} ref={ref} />;
  },
);
