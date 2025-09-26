import {
  Carousel,
  CarouselBody,
  CarouselItem,
  CarouselLeftChevron,
  CarouselRightChevron,
  CarouselThumbnail,
  CarouselThumbnailItem,
} from '@/components/ui/Carousel';
import { memo, useCallback, useMemo } from 'react';
import { ListItem } from './ListItem';
import { ThumbnailListItem } from './ThumbnailListItem/ThumbnailListItem';
import { useFileViewerModal } from './useFileViewerModal';

export const Body = memo(function Body() {
  const { taskFileIds, setState, currentTaskFileId } = useFileViewerModal();
  const defaultIndex = useMemo(
    () => taskFileIds.indexOf(currentTaskFileId),
    [taskFileIds, currentTaskFileId],
  );

  const handleChangeCarousel = useCallback(
    (currentIndex: number) => {
      setState((s) => ({
        ...s,
        currentTaskFileId: taskFileIds[currentIndex],
      }));
    },
    [taskFileIds, setState],
  );

  return (
    <Carousel defaultIndex={defaultIndex} onChange={handleChangeCarousel}>
      <CarouselBody>
        {taskFileIds.map((id) => (
          <CarouselItem key={id}>
            <ListItem taskFileId={id} />
          </CarouselItem>
        ))}
      </CarouselBody>
      <CarouselThumbnail>
        {taskFileIds.map((id) => (
          <CarouselThumbnailItem key={id}>
            <ThumbnailListItem taskFileId={id} />
          </CarouselThumbnailItem>
        ))}
      </CarouselThumbnail>
      <CarouselRightChevron />
      <CarouselLeftChevron />
    </Carousel>
  );
});
