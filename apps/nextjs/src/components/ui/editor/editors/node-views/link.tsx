import type { PropsWithChildren } from 'react';
import { Icon } from '@/components/ui/icon';
import { Link as AtomsLink } from '@/components/ui/link';
import { PopoverEditorLink } from '@/features/editor/components/popover-editor-link/popover-editor-link';
import { PopoverEditorLinkContent } from '@/features/editor/components/popover-editor-link/popover-editor-link-content';
import { PopoverEditorLinkText } from '@/features/editor/components/popover-editor-link/popover-editor-link-text';
import { PopoverEditorLinkTrigger } from '@/features/editor/components/popover-editor-link/popover-editor-link-trigger';
import { useReactNodeView } from '../react-node-view';

export function Link(props: PropsWithChildren) {
  const context = useReactNodeView();

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>{props.children}</PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <Icon icon="linkExternal" color="fg.muted" size="sm" />
        <PopoverEditorLinkText>
          <AtomsLink
            href={context.node?.attrs.href}
            target="_blank"
            rel="noopener noreferrer"
            color="cyan.400"
            _hover={{ textDecoration: 'underline' }}
          >
            {context.node?.attrs.href}
          </AtomsLink>
        </PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  );
}
