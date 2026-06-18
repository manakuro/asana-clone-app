import { memo } from 'react';
import { AttachmentMenu } from '@/components/features/Menus';
import { Menu } from '@/components/ui/menu';
import { NewBox } from '@/components/ui/new-box';

export const NewButton = memo(function NewButton() {
  return (
    <AttachmentMenu
      label="Attach a file. This file will not be persisted in database."
      tooltip={{ size: 'md', contentProps: { textAlign: 'left' } }}
    >
      <Menu.Trigger asChild cursor="pointer">
        <NewBox size="lg" />
      </Menu.Trigger>
    </AttachmentMenu>
  );
});
