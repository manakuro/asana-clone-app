import { Container } from '@/components/features/task-detail/components/thumbnail-attachment/container';
import { useThumbnailAttachmentContext } from '@/components/features/task-detail/components/thumbnail-attachment/context';
import { Menu } from '@/components/features/task-detail/components/thumbnail-attachment/menu';
import { MenuButton } from '@/components/features/task-detail/components/thumbnail-attachment/menu-button';
import { Overlay } from '@/components/features/task-detail/components/thumbnail-attachment/overlay';
import { Tooltip } from '@/components/features/task-detail/components/thumbnail-attachment/tooltip';
import type { FlexProps } from '@/components/ui/flex';
import { Image as AtomsImage } from '@/components/ui/image';
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
