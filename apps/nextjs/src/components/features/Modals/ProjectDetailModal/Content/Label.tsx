import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export function Label(props: Props) {
  return (
    <Flex
      color="fg.muted"
      fontWeight="medium"
      fontSize="xs"
      mb={2}
      {...props}
    />
  );
}
