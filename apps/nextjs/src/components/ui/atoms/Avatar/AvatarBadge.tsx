import {
  AvatarBadge as ChakraAvatarBadge,
  type AvatarBadgeProps as ChakraAvatarBadgeProps,
} from '@chakra-ui/react';

type Props = ChakraAvatarBadgeProps;
export type AvatarBadgeProps = Props;

export function AvatarBadge(props: Props) {
  return <ChakraAvatarBadge {...props} />;
}
