import { Container } from '@/components/features/molecules/ThumbnailAttachment/Container';
import { Menu } from '@/components/features/molecules/ThumbnailAttachment/Menu';
import { MenuButton } from '@/components/features/molecules/ThumbnailAttachment/MenuButton';
import { Overlay } from '@/components/features/molecules/ThumbnailAttachment/Overlay';
import { useThumbnailAttachmentContext } from '@/components/features/molecules/ThumbnailAttachment/Provider';
import { Tooltip } from '@/components/features/molecules/ThumbnailAttachment/Tooltip';
import type { FlexProps } from '@/components/ui/atoms';
import { Image as AtomsImage } from '@/components/ui/atoms';
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
