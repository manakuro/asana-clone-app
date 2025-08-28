import { Text, type TextProps } from '@/components/ui/atoms';
import type React from 'react';

type Props = TextProps;
export type MoreLinkProps = Props;

export function MoreLink(props: Props) {
  return (
    <Text
      as="span"
      fontSize="xs"
      color="link"
      cursor="pointer"
      _hover={{
        textDecoration: 'underline !important',
      }}
      {...props}
    />
  );
}
