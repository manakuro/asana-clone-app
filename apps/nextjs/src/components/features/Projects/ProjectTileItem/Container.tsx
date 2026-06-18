import type { SystemStyleObject } from '@chakra-ui/react';
import { type ReactElement, useCallback, useState } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import { useHover } from '@/hooks/useHover';
import { transitions } from '@/styles/transitions';

type Props = {
  name: string;
  children(data: {
    showTransition: boolean;
    handlePopoverProjectMenuOpened: () => void;
    handlePopoverProjectMenuClosed: () => void;
  }): ReactElement;
} & Omit<FlexProps, 'children'>;

const focusedStyle: SystemStyleObject = {
  bg: 'gray.50',
  transform: 'translate(0, -5px)',
};
export function Container(props: Props) {
  const { children, name, ...rest } = props;
  const { ref, isHovering } = useHover<HTMLDivElement>();
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
      css={focused ? focusedStyle : {}}
      {...rest}
    >
      {children({
        showTransition,
        handlePopoverProjectMenuOpened,
        handlePopoverProjectMenuClosed,
      })}
      <Text mt={2} textAlign="center">
        {name}
      </Text>
    </Flex>
  );
}
