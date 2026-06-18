import { memo } from 'react';
import { useReactNodeView } from '@/components/ui/editor/editors/react-node-view';
import { useProjectTaskQuery } from '@/hooks/queries/entities';
import type { MentionAttrs } from '@/shared/prosemirror/schema';
import { Loading } from './loading';
import { TaskLink } from './task-link';

export const Task = memo(function Task() {
  const context = useReactNodeView();
  const attrs = context.node?.attrs as MentionAttrs;

  const { projectTask, loading } = useProjectTaskQuery(attrs.mentionId);

  if (loading) return <Loading />;
  if (!projectTask?.id) return null;

  return <TaskLink projectTaskId={projectTask.id} />;
});
