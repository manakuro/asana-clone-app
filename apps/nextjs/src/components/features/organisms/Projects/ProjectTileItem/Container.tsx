import { Flex, type FlexProps, Text } from '@/components/ui/atoms';
import { useHover } from '@/hooks/useHover';
import { transitions } from '@/styles';
import { type ReactElement, useCallback, useState } from 'react';

type Props = {
  name: string;
  children(data: {
    showTransition: boolean;
    handlePopoverProjectMenuOpened: () => void;
    handlePopoverProjectMenuClosed: () => void;
  }): ReactElement;
} & Omit<FlexProps, 'children'>;

const focusedStyle: FlexProps = {
  bg: 'gray.50',
  transform: 'translate(0, -5px)',
};
export function Container(props: Props) {
  const { children, name, ...rest } = props;
  const { ref, isHovering } = useHover();
  const [focused, setFocused] = useState(false);

  const handlePopoverProjectMenuOpened = useCallback(() => {
    setFocused(true);
  }, []);
  const handlePopoverProjectMenuClosed = useCallback(() => {
    setFocused(false);
  }, []);

  const showTransition = isHovering || focused;

  return (
    <Flex
      borderRadius="3xl"
      _hover={focusedStyle}
      transition={transitions.base()}
      w="152px"
      h="226px"
      alignItems="center"
      pt={4}
      cursor="pointer"
      flexDirection="column"
      ref={ref}
      {...(focused ? focusedStyle : {})}
      {...rest}
    >
      {children({
        showTransition,
        handlePopoverProjectMenuOpened,
        handlePopoverProjectMenuClosed,
      })}
      <Text mt={2}>{name}</Text>
    </Flex>
  );
}
