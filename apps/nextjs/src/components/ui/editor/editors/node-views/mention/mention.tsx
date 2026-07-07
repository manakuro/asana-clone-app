import { useReactNodeView } from '@/components/ui/editor/editors';
import {
  MentionType,
  type MentionTypeCode,
} from '@/features/editor/store/mention';
import type { MentionAttrs } from '@/lib/prosemirror/schema';
import { Project } from './project';
import { Task } from './task';
import { Teammate } from './teammate';
import { Workspace } from './workspace';

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
