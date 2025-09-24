import { Box } from '@/components/ui/atoms';
import type { ChakraProps } from '@/shared/chakra';
import {
  MenuButton as ChakraMenuButton,
  type MenuButtonProps as ChakraMenuButtonProps,
} from '@chakra-ui/react';
import type React from 'react';
import { useMemo } from 'react';

type Props = ChakraMenuButtonProps &
  React.ComponentProps<typeof ChakraMenuButton> & {
    spanStyle?: ChakraProps;
  };
export type MenuButtonProps = Props;

export function MenuButton(props: Props) {
  const { spanStyle, ...rest } = props;
  const style = useMemo(
    () => ({
      ...(spanStyle ? { sx: { '> span': spanStyle } } : {}),
    }),
    [spanStyle],
  );

  return (
    <ChakraMenuButton
      as={Box}
      outline="none; !important"
      {...style}
      {...rest}
    />
  );
}
