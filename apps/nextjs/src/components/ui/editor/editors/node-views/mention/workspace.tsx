import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { NextLink } from '@/components/ui/next-link';
import { PopoverEditorLink } from '@/features/editor/components/popover-editor-link/popover-editor-link';
import { PopoverEditorLinkContent } from '@/features/editor/components/popover-editor-link/popover-editor-link-content';
import { PopoverEditorLinkText } from '@/features/editor/components/popover-editor-link/popover-editor-link-text';
import { PopoverEditorLinkTrigger } from '@/features/editor/components/popover-editor-link/popover-editor-link-trigger';
import { ROUTE_WORKSPACES_OVERVIEW } from '@/router';
import { useWorkspace } from '@/store/entities/workspace';

export const Workspace = memo(function Workspace() {
  const { workspace } = useWorkspace();

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>
        {`${workspace.name} `}
      </PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <Icon icon="group" color="fg.muted" />
        <PopoverEditorLinkText>
          <Link
            asChild
            color="cyan.400"
            _hover={{ textDecoration: 'underline' }}
          >
            <NextLink
              href={ROUTE_WORKSPACES_OVERVIEW.href.pathnameObj(workspace.id)}
            >
              {workspace.name}
            </NextLink>
          </Link>
        </PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  );
});
