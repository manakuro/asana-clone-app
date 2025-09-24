import { AttachmentMenu } from '@/components/features/organisms/Menus';
import { MenuButton } from '@/components/ui/Menu';
import { Icon, IconButton } from '@/components/ui/atoms';
import { memo } from 'react';

export const Attachment = memo(function Attachment() {
  return (
    <AttachmentMenu
      label="Add a file to this task. This file will not be persisted in database."
      tooltip={{ textAlign: 'left', size: 'md' }}
    >
      <MenuButton
        aria-label="Attachment button"
        as={IconButton}
        icon={<Icon icon="attach" color="text.muted" />}
        size="sm"
        variant="ghost"
      />
    </AttachmentMenu>
  );
});
