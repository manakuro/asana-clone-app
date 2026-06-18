import { Text, type TextProps } from '@/components/ui/text';

type Props = TextProps;

export function MoreLink(props: Props) {
  return (
    <Text
      as="span"
      fontSize="xs"
      color="cyan.500"
      cursor="pointer"
      _hover={{
        textDecoration: 'underline !important',
      }}
      {...props}
    />
  );
}
