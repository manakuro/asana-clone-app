import { memo } from 'react';
import {
  PopoverEditorLink,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
  PopoverEditorLinkTrigger,
} from '@/components/features/Popovers';
import { ColorBox } from '@/components/ui/color-box';
import { useReactNodeView } from '@/components/ui/editor/editors/react-node-view';
import { Link } from '@/components/ui/link';
import { NextLink } from '@/components/ui/next-link';
import { ROUTE_PROJECTS_LIST } from '@/router';
import type { MentionAttrs } from '@/shared/prosemirror/schema';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';

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
