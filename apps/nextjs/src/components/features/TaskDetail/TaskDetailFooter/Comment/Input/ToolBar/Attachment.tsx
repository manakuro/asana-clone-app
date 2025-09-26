import { AttachmentMenu } from '@/components/features/Menus';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { MenuButton } from '@/components/ui/Menu';
import { memo } from 'react';
import { useInputContext } from '../Provider';

export const Attachment = memo(function Attachment() {
  const { onUploadFile } = useInputContext();

  return (
    <AttachmentMenu
      label={
        'Attach a file or paste an image. (This file will not be persisted in database.) '
      }
      tooltip={{ openDelay: 500, textAlign: 'left', size: 'md' }}
      onUpload={onUploadFile}
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
