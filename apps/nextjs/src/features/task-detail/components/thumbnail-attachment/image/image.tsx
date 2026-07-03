import type { FlexProps } from '@/components/ui/flex';
import { Image as AtomsImage } from '@/components/ui/image';
import { Container } from '@/features/task-detail/components/thumbnail-attachment/container';
import { useThumbnailAttachmentContext } from '@/features/task-detail/components/thumbnail-attachment/context';
import { Menu } from '@/features/task-detail/components/thumbnail-attachment/menu';
import { MenuButton } from '@/features/task-detail/components/thumbnail-attachment/menu-button';
import { Overlay } from '@/features/task-detail/components/thumbnail-attachment/overlay';
import { Tooltip } from '@/features/task-detail/components/thumbnail-attachment/tooltip';
import { useTaskFile } from '@/store/entities/task-file';

type Props = FlexProps & {
  taskFileId: string;
};

export function Image(props: Props) {
  const { taskFileId, ...rest } = props;
  const { taskFile } = useTaskFile(taskFileId);
  const { isHovering } = useThumbnailAttachmentContext();

  return (
    <Tooltip taskFileId={taskFileId}>
      <Container bg="gray.50" {...rest}>
        <AtomsImage
          width="auto"
          maxH={16}
          maxW="240px"
          src={taskFile.src}
          borderRadius="lg"
          objectFit="cover"
        />
        <Overlay isHovering={isHovering} />
        <Menu taskFileId={taskFileId}>
          <MenuButton color="white" light />
        </Menu>
      </Container>
    </Tooltip>
  );
}
