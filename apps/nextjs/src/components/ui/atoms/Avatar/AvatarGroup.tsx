import {
  AvatarGroup as ChakraAvatarGroup,
  type AvatarGroupProps as ChakraAvatarGroupProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraAvatarGroupProps & {
  ref?: React.MutableRefObject<any>;
};
export type AvatarGroupProps = Props;

export const AvatarGroup = forwardRef<HTMLDivElement, Props>(
  function AvatarGroup(props, ref) {
    return <ChakraAvatarGroup {...props} ref={ref} />;
  },
);
