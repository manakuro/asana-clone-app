import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';
import { forwardRef } from 'react';
import type React from 'react';

type Props = FlexProps & {
  ref?: React.ForwardedRef<any>;
};
export type DashedBoxProps = Props;

export const DashedBox = forwardRef<HTMLDivElement, Props>(
  function DashedBox(props, ref) {
    const { clickableHoverLightStyle } = useClickableHoverStyle();

    return (
      <Flex
        border="dashed 2px"
        borderColor="gray.300"
        borderRadius="md"
        p={2}
        color="text.muted"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        ref={ref}
        {...props}
        {...clickableHoverLightStyle}
      />
    );
  },
);
