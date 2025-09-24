import { useDisabledStyle } from '@/hooks';
import {
  MenuItem as ChakraMenuItem,
  type MenuItemProps as ChakraMenuItemProps,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';

type Props = ChakraMenuItemProps & {
  link?: boolean;
};
export type MenuItemProps = Props;

export function MenuItem(props: Props) {
  const { link, isDisabled, ...rest } = props;
  const { disabledStyle } = useDisabledStyle();

  const style = useMemo(
    () => ({
      ...(isDisabled ? disabledStyle : {}),
    }),
    [disabledStyle, isDisabled],
  );

  if (link) {
    if (!React.isValidElement(props.children)) {
      console.warn('【Menu/MenuItem】Children must be React component');
      return null;
    }

    const element = React.cloneElement(props.children, {
      p: '0.4rem 0.8rem',
      w: 'full',
    });
    return (
      <ChakraMenuItem {...rest} p={0}>
        {element}
      </ChakraMenuItem>
    );
  }

  return <ChakraMenuItem fontSize="sm" {...rest} {...style} />;
}
