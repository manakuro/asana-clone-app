import type React from 'react';
import { forwardRef } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useClickableHoverStyle } from '@/hooks';

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
        color="fg.muted"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        ref={ref}
        {...props}
        css={clickableHoverLightStyle}
      />
    );
  },
);
