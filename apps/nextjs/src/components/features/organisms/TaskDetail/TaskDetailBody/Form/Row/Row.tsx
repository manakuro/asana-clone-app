import { Flex, type FlexProps } from '@/components/ui/atoms/Flex';

type Props = FlexProps;

export function Row(props: Props) {
  return (
    <Flex minH={9} {...props}>
      {props.children}
    </Flex>
  );
}
