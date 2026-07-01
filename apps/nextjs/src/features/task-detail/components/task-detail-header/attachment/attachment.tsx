import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Menu } from '@/components/ui/menu';
import { AttachmentMenu } from '@/features/task-detail/components/attachment-menu';

export const Attachment = memo(function Attachment() {
  return (
    <AttachmentMenu
      label="Add a file to this task. This file will not be persisted in database."
      tooltip={{ contentProps: { textAlign: 'left' }, size: 'md' }}
    >
      <Menu.Trigger asChild>
        <IconButton aria-label="Attachment button" size="sm" variant="ghost">
          <Icon icon="attach" color="fg.muted" />
        </IconButton>
      </Menu.Trigger>
    </AttachmentMenu>
  );
});
