import { useCallback } from 'react';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { useCarouselContext } from './provider';

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
      zIndex="skipNav"
    >
      <IconButton onClick={handleClick} aria-label="next" variant="ghost">
        <Icon icon="chevronRight" size="2xl" />
      </IconButton>
    </Flex>
  );
}
