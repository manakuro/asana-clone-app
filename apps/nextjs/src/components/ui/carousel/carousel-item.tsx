import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { Flex } from '@/components/ui/flex';
import { useCarouselContext } from './provider';

type Props = {
  index?: number;
};

export function CarouselItem({ index, children }: PropsWithChildren<Props>) {
  const { currentIndex } = useCarouselContext();
  const show = useMemo(() => currentIndex === index, [currentIndex, index]);

  return (
    <Flex
      w="full"
      h="full"
      position="absolute"
      top={0}
      left={0}
      justifyContent="center"
      alignItems="center"
      px={{ base: 0, md: 24 }}
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
        {children}
      </Flex>
    </Flex>
  );
}
