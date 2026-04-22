import {
  Badge as ChakraBadge,
  type BadgeProps as ChakraBadgeProps,
} from '@chakra-ui/react';

type Props = ChakraBadgeProps;
export type BadgeProps = Props;

export function Badge(props: Props) {
  return (
    <ChakraBadge
      px={3}
      textTransform="none"
      borderRadius="full"
      display="inline-block"
      {...props}
    />
  );
}
