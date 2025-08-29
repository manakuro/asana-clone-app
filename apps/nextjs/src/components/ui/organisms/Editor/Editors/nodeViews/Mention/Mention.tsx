import { useReactNodeView } from '@/components/ui/organisms/Editor/Editors';
import type { MentionAttrs } from '@/shared/prosemirror/schema';
import { MentionType, type MentionTypeCode } from '@/store/entities/mention';
import { Project } from './Project';
import { Task } from './Task';
import { Teammate } from './Teammate';
import { Workspace } from './Workspace';

export function Mention() {
  const context = useReactNodeView();
  const attrs = context.node?.attrs as MentionAttrs;
  const type = Number(attrs.mentionType) as MentionTypeCode;

  switch (type) {
    case MentionType.TEAMMATE:
      return <Teammate />;
    case MentionType.TASK:
      return <Task />;
    case MentionType.PROJECT:
      return <Project />;
    case MentionType.WORKSPACE:
      return <Workspace />;
  }
}
