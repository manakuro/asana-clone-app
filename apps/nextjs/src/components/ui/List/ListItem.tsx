import {
  ListItem as ChakraListItem,
  type ListItemProps as ChakraListItemProps,
} from '@chakra-ui/react';

type Props = ChakraListItemProps;
export type ListItemProps = ChakraListItemProps;

export function ListItem(props: Props) {
  return <ChakraListItem {...props} />;
}
