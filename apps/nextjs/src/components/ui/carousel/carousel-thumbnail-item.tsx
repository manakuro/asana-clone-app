import type { PropsWithChildren } from 'react';
import { useCallback, useMemo } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { WrapItem } from '@/components/ui/wrap';
import { useClickableHoverStyle } from '@/hooks';
import { useCarouselContext } from './provider';

type Props = {
  index: number;
};

export function CarouselThumbnailItem(props: PropsWithChildren<Props>) {
  const { currentIndex, setCurrentIndex } = useCarouselContext();
  const show = useMemo(
    () => currentIndex === props.index,
    [currentIndex, props.index],
  );
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleClick = useCallback(() => {
    setCurrentIndex(props.index);
  }, [props.index, setCurrentIndex]);

  return (
    <WrapItem
      justifyContent="center"
      alignItems="center"
      {...clickableHoverLightStyle}
      opacity={show ? 1 : 0.5}
      borderRadius="md"
      cursor="pointer"
      onClick={handleClick}
    >
      <AspectRatio w={16} ratio={4 / 3}>
        {props.children}
      </AspectRatio>
    </WrapItem>
  );
}
