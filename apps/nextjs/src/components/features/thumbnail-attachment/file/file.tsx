import { AttachmentBox } from '@/components/features/attachment-box';
import { Container } from '@/components/features/thumbnail-attachment/container';
import { useThumbnailAttachmentContext } from '@/components/features/thumbnail-attachment/context';
import { Menu } from '@/components/features/thumbnail-attachment/menu';
import { MenuButton } from '@/components/features/thumbnail-attachment/menu-button';
import { Tooltip } from '@/components/features/thumbnail-attachment/tooltip';
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
