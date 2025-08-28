import {
  RadioGroup as ChakraRadioGroup,
  type RadioGroupProps as ChakraRadioGroupProps,
} from '@chakra-ui/react';

type Props = ChakraRadioGroupProps;
export type RadioGroupProps = Props;

export function RadioGroup(props: Props) {
  return <ChakraRadioGroup {...props} />;
}
