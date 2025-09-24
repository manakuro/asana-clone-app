import { useClickableHoverStyle } from '@/hooks';
import {
  Tab as ChakraTab,
  type TabProps as ChakraTabProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTabProps;
export type TabProps = Props;

export const Tab = forwardRef<HTMLButtonElement, Props>(
  function Tab(props, ref) {
    const { clickableHoverLightStyle } = useClickableHoverStyle();

    return (
      <ChakraTab
        px={0}
        mr={4}
        mb={0}
        {...(props.isDisabled ? {} : clickableHoverLightStyle)}
        fontWeight="medium"
        {...props}
        ref={ref}
      />
    );
  },
);
