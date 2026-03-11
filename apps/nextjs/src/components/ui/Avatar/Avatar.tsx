import {
  Avatar as ChakraAvatar,
  type AvatarProps as ChakraAvatarProps,
} from '@chakra-ui/react';

export {
  AvatarGroup,
  type AvatarGroupProps,
} from '@chakra-ui/react';

type Props = ChakraAvatarProps;
export type AvatarProps = Props;

export function Avatar(props: Props) {
  return <ChakraAvatar border="none" bg="teal.200" {...props} />;
}
