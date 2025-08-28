import {
  PopoverEditorLink,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
  PopoverEditorLinkTrigger,
} from '@/components/features/organisms/Popovers';
import { ColorBox } from '@/components/ui/atoms';
import { useReactNodeView } from '@/components/ui/organisms/Editor/Editors/ReactNodeView';
import type { MentionAttrs } from '@/shared/prosemirror/schema';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';
import type React from 'react';
import { memo } from 'react';

export const Project: React.FC = memo(() => {
  const context = useReactNodeView();
  const attrs = context.node?.attrs as MentionAttrs;
  const { project } = useProject(attrs.mentionId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>{`${project.name} `}</PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <ColorBox size="sm" color={projectBaseColor.color.color} />
        <PopoverEditorLinkText>{project.name}</PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  );
});
