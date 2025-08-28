import {
  AccordionPanel as ChakraAccordionPanel,
  type AccordionPanelProps as ChakraAccordionPanelProps,
} from '@chakra-ui/react';

type Props = ChakraAccordionPanelProps;
export type AccordionPanelProps = Props;

export function AccordionPanel(props: Props) {
  return <ChakraAccordionPanel {...props} />;
}
