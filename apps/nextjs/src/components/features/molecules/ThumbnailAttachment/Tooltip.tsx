import { Flex } from '@/components/ui/atoms';
import {
  Tooltip as MoleculesTooltip,
  type TooltipProps,
} from '@/components/ui/molecules';
import { useDisclosure } from '@/shared/chakra';
import { useTaskFile } from '@/store/entities/taskFile';
import { useEffect } from 'react';
import { useThumbnailAttachmentContext } from './Provider';

type Props = Omit<TooltipProps, 'label' | 'size'> & {
  taskFileId: string;
};

export function Tooltip(props: Props) {
  const { taskFileId, children, ...rest } = props;
  const { taskFile } = useTaskFile(taskFileId);
  const tooltipDisclosure = useDisclosure();
  const { isHovering, thumbnailMenuOpened } = useThumbnailAttachmentContext();

  useEffect(() => {
    if (!thumbnailMenuOpened && isHovering) {
      setTimeout(() => {
        tooltipDisclosure.onOpen();
      }, props.openDelay ?? 0);
    } else {
      tooltipDisclosure.onClose();
    }
  }, [isHovering, props.openDelay, thumbnailMenuOpened, tooltipDisclosure]);

  return (
    <MoleculesTooltip
      isOpen={tooltipDisclosure.isOpen}
      hasArrow
      label={taskFile.name}
      aria-label={taskFile.src}
      size="sm"
      {...rest}
    >
      <Flex>{children}</Flex>
    </MoleculesTooltip>
  );
}
