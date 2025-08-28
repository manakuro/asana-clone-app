import {
  AccordionIcon as ChakraAccordionIcon,
  type IconProps as ChakraAccordionIconProps,
} from '@chakra-ui/react';

type Props = ChakraAccordionIconProps;
export type AccordionIconProps = Props;

export function AccordionIcon(props: Props) {
  return <ChakraAccordionIcon {...props} />;
}
