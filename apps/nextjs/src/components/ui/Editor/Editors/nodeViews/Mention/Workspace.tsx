import { memo } from 'react';
import {
  PopoverEditorLink,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
  PopoverEditorLinkTrigger,
} from '@/components/features/Popovers';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/components/ui/Link';
import { NextLink } from '@/components/ui/NextLink';
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
          <Link asChild>
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
