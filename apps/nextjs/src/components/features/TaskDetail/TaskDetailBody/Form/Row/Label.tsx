import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export function Label(props: Props) {
  return (
    <Flex w="100px" {...props}>
      <Flex h={9} alignItems="center" fontSize="xs" color="fg.muted">
        {props.children}
      </Flex>
    </Flex>
  );
}
