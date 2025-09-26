import {
  PopoverEditorLink,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
  PopoverEditorLinkTrigger,
} from '@/components/features/Popovers';
import { Icon } from '@/components/ui/Icon';
import { Link as AtomsLink } from '@/components/ui/Link';
import type React from 'react';
import { useReactNodeView } from '../ReactNodeView';

export function Link(props: React.PropsWithChildren) {
  const context = useReactNodeView();

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>{props.children}</PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <Icon icon="linkExternal" color="text.muted" size="sm" />
        <PopoverEditorLinkText>
          <AtomsLink href={context.node?.attrs.href} isExternal>
            {context.node?.attrs.href}
          </AtomsLink>
        </PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  );
}
