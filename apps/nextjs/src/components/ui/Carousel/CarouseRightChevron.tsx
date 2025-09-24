import { Flex, Icon, IconButton } from '@/components/ui/atoms';
import { useCallback } from 'react';
import { useCarouselContext } from './Provider';

export function CarouselRightChevron() {
  const { count, currentIndex, setCurrentIndex } = useCarouselContext();

  const handleClick = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex === count) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex(nextIndex);
  }, [count, currentIndex, setCurrentIndex]);

  return (
    <Flex
      position="absolute"
      top={0}
      right={0}
      w={24}
      h="100%"
      justifyContent="center"
      alignItems="center"
      zIndex="skipLink"
    >
      <IconButton
        onClick={handleClick}
        aria-label="next"
        icon={<Icon icon="chevronRight" size="2xl" />}
        variant="ghost"
        light
      />
    </Flex>
  );
}
