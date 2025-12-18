import { memo } from 'react';
import { AttachmentMenu } from '@/components/features/Menus';
import { MenuButton } from '@/components/ui/Menu';
import { NewBox } from '@/components/ui/NewBox';

export const NewButton = memo(function NewButton() {
  return (
    <AttachmentMenu
      label="Attach a file. This file will not be persisted in database."
      tooltip={{ size: 'md', textAlign: 'left' }}
    >
      <MenuButton cursor="pointer">
        <NewBox size="lg" />
      </MenuButton>
    </AttachmentMenu>
  );
});
