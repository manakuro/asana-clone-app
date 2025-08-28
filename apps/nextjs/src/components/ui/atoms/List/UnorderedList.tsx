import {
  type ListProps as ChakraListProps,
  UnorderedList as ChakraUnorderedList,
} from '@chakra-ui/react';

type Props = ChakraListProps;
export type UnorderedListProps = Props;

export function UnorderedList(props: Props) {
  return <ChakraUnorderedList {...props} />;
}
