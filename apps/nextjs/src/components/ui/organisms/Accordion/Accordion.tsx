import {
  Accordion as ChakraAccordion,
  type AccordionProps as ChakraAccordionProps,
} from '@chakra-ui/react';

type Props = ChakraAccordionProps;
export type AccordionProps = Props;

export function Accordion(props: Props) {
  return <ChakraAccordion {...props} />;
}
