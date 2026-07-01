import { AttachmentBox } from '@/components/features/task-detail/components/attachment-box';
import { Container } from '@/components/features/task-detail/components/thumbnail-attachment/container';
import { useThumbnailAttachmentContext } from '@/components/features/task-detail/components/thumbnail-attachment/context';
import { Menu } from '@/components/features/task-detail/components/thumbnail-attachment/menu';
import { MenuButton } from '@/components/features/task-detail/components/thumbnail-attachment/menu-button';
import { Tooltip } from '@/components/features/task-detail/components/thumbnail-attachment/tooltip';
import type { FlexProps } from '@/components/ui/flex';

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
