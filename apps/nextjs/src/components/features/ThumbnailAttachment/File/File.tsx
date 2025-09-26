import { AttachmentBox } from '@/components/features/AttachmentBox';
import { Container } from '@/components/features/ThumbnailAttachment/Container';
import { Menu } from '@/components/features/ThumbnailAttachment/Menu';
import { MenuButton } from '@/components/features/ThumbnailAttachment/MenuButton';
import { useThumbnailAttachmentContext } from '@/components/features/ThumbnailAttachment/Provider';
import { Tooltip } from '@/components/features/ThumbnailAttachment/Tooltip';
import type { FlexProps } from '@/components/ui/Flex';

type Props = FlexProps & {
  taskFileId: string;
};

export function File(props: Props) {
  const { taskFileId, ...rest } = props;
  const { isHovering } = useThumbnailAttachmentContext();

  return (
    <Tooltip taskFileId={taskFileId} openDelay={500}>
      <Container {...rest}>
        <AttachmentBox
          size="md"
          taskFileId={taskFileId}
          isHovering={isHovering}
        />
        <Menu taskFileId={taskFileId}>
          <MenuButton color="text.muted" />
        </Menu>
      </Container>
    </Tooltip>
  );
}
