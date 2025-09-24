import { Flex } from '@/components/ui/atoms';
import type React from 'react';
import { useMemo } from 'react';
import { useCarouselContext } from './Provider';

type Props = {
  index?: number;
};

export function CarouselItem(props: React.PropsWithChildren<Props>) {
  const { currentIndex } = useCarouselContext();
  const show = useMemo(
    () => currentIndex === props.index,
    [currentIndex, props.index],
  );

  return (
    <Flex
      w="full"
      h="full"
      position="absolute"
      top={0}
      left={0}
      justifyContent="center"
      alignItems="center"
      px={24}
      opacity={show ? 1 : 0}
      zIndex={show ? 'popover' : 'base'}
    >
      <Flex
        w="full"
        h="full"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        {props.children}
      </Flex>
    </Flex>
  );
}
