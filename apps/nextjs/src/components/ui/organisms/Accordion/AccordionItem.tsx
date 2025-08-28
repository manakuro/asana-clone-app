import {
  AccordionItem as ChakraAccordionItem,
  type AccordionItemProps as ChakraAccordionItemProps,
} from '@chakra-ui/react';

type Props = ChakraAccordionItemProps;
export type AccordionItemProps = Props;

export function AccordionItem(props: Props) {
  return <ChakraAccordionItem {...props} />;
}
