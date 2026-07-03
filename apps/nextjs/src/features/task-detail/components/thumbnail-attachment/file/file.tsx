import type { FlexProps } from '@/components/ui/flex';
import { AttachmentBox } from '@/features/task-detail/components/attachment-box';
import { Container } from '@/features/task-detail/components/thumbnail-attachment/container';
import { useThumbnailAttachmentContext } from '@/features/task-detail/components/thumbnail-attachment/context';
import { Menu } from '@/features/task-detail/components/thumbnail-attachment/menu';
import { MenuButton } from '@/features/task-detail/components/thumbnail-attachment/menu-button';
import { Tooltip } from '@/features/task-detail/components/thumbnail-attachment/tooltip';

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
          <MenuButton color="fg.muted" />
        </Menu>
      </Container>
    </Tooltip>
  );
}
