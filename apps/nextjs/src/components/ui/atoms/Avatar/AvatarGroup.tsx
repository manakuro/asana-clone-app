import {
  AvatarGroup as ChakraAvatarGroup,
  type AvatarGroupProps as ChakraAvatarGroupProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'src/shared/chakra';

type Props = ChakraAvatarGroupProps & {
  ref?: React.MutableRefObject<any>;
};
export type AvatarGroupProps = Props;

export const AvatarGroup: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraAvatarGroup {...props} ref={ref} />
));
