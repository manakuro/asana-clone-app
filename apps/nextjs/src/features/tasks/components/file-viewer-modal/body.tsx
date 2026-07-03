import { memo, useCallback, useMemo } from 'react';
import {
  Carousel,
  CarouselBody,
  CarouselItem,
  CarouselLeftChevron,
  CarouselRightChevron,
  CarouselThumbnail,
  CarouselThumbnailItem,
} from '@/components/ui/carousel';
import { ListItem } from './list-item';
import { ThumbnailListItem } from './thumbnail-list-item/thumbnail-list-item';
import { useFileViewerModal } from './use-file-viewer-modal';

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
        {taskFileIds.map((id, index) => (
          <CarouselThumbnailItem key={id} index={index}>
            <ThumbnailListItem taskFileId={id} />
          </CarouselThumbnailItem>
        ))}
      </CarouselThumbnail>
      <CarouselRightChevron />
      <CarouselLeftChevron />
    </Carousel>
  );
});
