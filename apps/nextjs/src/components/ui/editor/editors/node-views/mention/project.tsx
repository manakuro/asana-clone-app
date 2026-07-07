import { memo } from 'react';
import { ColorBox } from '@/components/ui/color-box';
import { useReactNodeView } from '@/components/ui/editor/editors/react-node-view';
import { Link } from '@/components/ui/link';
import { NextLink } from '@/components/ui/next-link';
import { PopoverEditorLink } from '@/features/editor/components/popover-editor-link/popover-editor-link';
import { PopoverEditorLinkContent } from '@/features/editor/components/popover-editor-link/popover-editor-link-content';
import { PopoverEditorLinkText } from '@/features/editor/components/popover-editor-link/popover-editor-link-text';
import { PopoverEditorLinkTrigger } from '@/features/editor/components/popover-editor-link/popover-editor-link-trigger';
import { useProject } from '@/features/project/store/project';
import { useProjectBaseColor } from '@/features/project/store/project-base-color';
import type { MentionAttrs } from '@/lib/prosemirror/schema';
import { ROUTE_PROJECTS_LIST } from '@/router';

export const Project = memo(function Project() {
  const context = useReactNodeView();
  const attrs = context.node?.attrs as MentionAttrs;
  const { project } = useProject(attrs.mentionId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>{`${project.name} `}</PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <ColorBox size="sm" color={projectBaseColor.color.color} />
        <PopoverEditorLinkText>
          <Link
            asChild
            color="cyan.400"
            _hover={{ textDecoration: 'underline' }}
          >
            <NextLink href={ROUTE_PROJECTS_LIST.href.pathnameObj(project.id)}>
              {project.name}
            </NextLink>
          </Link>
        </PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  );
});
