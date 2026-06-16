import { Tabs, type TabsTriggerProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useClickableHoverStyle } from '@/hooks';

type Props = TabsTriggerProps;

export const Tab = forwardRef<HTMLButtonElement, Props>(
  function Tab(props, ref) {
    const { clickableHoverLightStyle } = useClickableHoverStyle();

    return (
      <Tabs.Trigger
        px={0}
        mr={4}
        mb={0}
        {...(props.disabled ? {} : clickableHoverLightStyle)}
        fontWeight="medium"
        {...props}
        _selected={{
          opacity: 1,
          _before: {
            bg: 'teal.solid',
          },
        }}
        ref={ref}
      />
    );
  },
);
