import {
  PopoverEditorLink,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
  PopoverEditorLinkTrigger,
} from '@/components/features/Popovers';
import { Icon } from '@/components/ui/Icon';
import { useWorkspace } from '@/store/entities/workspace';
import { memo } from 'react';

export const Workspace = memo(function Workspace() {
  const { workspace } = useWorkspace();

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>
        {`${workspace.name} `}
      </PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <Icon icon="group" color="text.muted" />
        <PopoverEditorLinkText>{workspace.name}</PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  );
});
