import {
  Checkbox as ChakraCheckBox,
  type CheckboxProps as ChakraCheckboxProps,
} from '@chakra-ui/react';

type Props = ChakraCheckboxProps;
export type CheckboxProps = Props;

export function Checkbox(props: Props) {
  return (
    <ChakraCheckBox
      {...props}
      // @see https://github.com/chakra-ui/chakra-ui/issues/2234
      sx={{
        '> span:first-of-type': {
          boxShadow: 'unset',
        },
      }}
    />
  );
}
