import { Flex, type FlexProps } from '@/components/ui/atoms';

type Props = FlexProps;

export function Content(props: Props) {
  return (
    <Flex alignItems="center" flex={1} {...props}>
      {props.children}
    </Flex>
  );
}
