import {
  AccordionButton as ChakraAccordionButton,
  type AccordionButtonProps as ChakraAccordionButtonProps,
} from '@chakra-ui/react';

type Props = ChakraAccordionButtonProps;
export type AccordionButtonProps = Props;

export function AccordionButton(props: Props) {
  return <ChakraAccordionButton {...props} />;
}
