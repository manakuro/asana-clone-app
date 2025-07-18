import {
  Accordion as ChakraAccordion,
  type AccordionProps as ChakraAccordionProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraAccordionProps;
export type AccordionProps = Props;

export const Accordion: React.FC<Props> = (props) => {
  return <ChakraAccordion {...props} />;
};
