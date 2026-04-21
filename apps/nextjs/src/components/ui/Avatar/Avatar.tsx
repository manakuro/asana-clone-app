import {
  Avatar as ChakraAvatar,
  type AvatarProps as ChakraAvatarProps,
} from '@/chakra-ui/ui/avatar';

export {
  AvatarGroup,
  type AvatarGroupProps,
} from '@chakra-ui/react';

type Props = ChakraAvatarProps;
export type AvatarProps = Props;

export function Avatar(props: Props) {
  return <ChakraAvatar colorPalette="teal" {...props} />;
}
