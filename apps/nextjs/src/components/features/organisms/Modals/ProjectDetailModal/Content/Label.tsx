import { Flex, type FlexProps } from '@/components/ui/atoms';

type Props = FlexProps;

export function Label(props: Props) {
  return (
    <Flex
      color="text.muted"
      fontWeight="medium"
      fontSize="xs"
      mb={2}
      {...props}
    />
  );
}
