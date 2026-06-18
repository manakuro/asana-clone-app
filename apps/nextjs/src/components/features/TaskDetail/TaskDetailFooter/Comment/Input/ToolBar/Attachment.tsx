import { memo } from 'react';
import { AttachmentMenu } from '@/components/features/Menus';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Menu } from '@/components/ui/menu';
import { useInputContext } from '../Provider';

export const Attachment = memo(function Attachment() {
  const { onUploadFile } = useInputContext();

  return (
    <AttachmentMenu
      label={
        'Attach a file or paste an image. (This file will not be persisted in database.) '
      }
      tooltip={{
        openDelay: 500,
        contentProps: { textAlign: 'left' },
        size: 'md',
      }}
      onUpload={onUploadFile}
    >
      <Menu.Trigger asChild>
        <IconButton aria-label="Attachment button" size="sm" variant="ghost">
          <Icon icon="attach" color="fg.muted" />
        </IconButton>
      </Menu.Trigger>
    </AttachmentMenu>
  );
});
