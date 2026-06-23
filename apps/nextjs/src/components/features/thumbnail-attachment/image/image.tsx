import { Container } from '@/components/features/thumbnail-attachment/container';
import { Menu } from '@/components/features/thumbnail-attachment/menu';
import { MenuButton } from '@/components/features/thumbnail-attachment/menu-button';
import { Overlay } from '@/components/features/thumbnail-attachment/overlay';
import { useThumbnailAttachmentContext } from '@/components/features/thumbnail-attachment/provider';
import { Tooltip } from '@/components/features/thumbnail-attachment/tooltip';
import type { FlexProps } from '@/components/ui/flex';
import { Image as AtomsImage } from '@/components/ui/image';
import { useTaskFile } from '@/store/entities/taskFile';

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
