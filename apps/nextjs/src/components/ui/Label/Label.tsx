import { type ChakraProps, chakra } from '@/shared/chakra';
import type { FormLabelProps } from '@chakra-ui/react';
import styled from '@emotion/styled';

type Props = ChakraProps & FormLabelProps;
export type LabelProps = Props;

export function Label(props: Props) {
  return <StyledLabel {...props} />;
}

const StyledLabel = chakra(styled.label``, {
  baseStyle: {
    display: 'flex',
    fontSize: 'sm',
    w: 'full',
  },
});
