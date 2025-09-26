import {
  Collapse as ChakraCollapse,
  type CollapseProps as ChakraCollapseProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraCollapseProps;
export type CollapseProps = Props;

export const Collapse = forwardRef<HTMLDivElement, Props>(
  function Collapse(props, ref) {
    return <ChakraCollapse {...props} ref={ref} />;
  },
);
