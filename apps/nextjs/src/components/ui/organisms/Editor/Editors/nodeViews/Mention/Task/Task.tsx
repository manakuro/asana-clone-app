import { useReactNodeView } from '@/components/ui/organisms/Editor/Editors/ReactNodeView';
import { useProjectTaskQuery } from '@/hooks/queries/entities';
import type { MentionAttrs } from '@/shared/prosemirror/schema';
import { memo } from 'react';
import { Loading } from './Loading';
import { TaskLink } from './TaskLink';

export const Task = memo(function Task() {
  const context = useReactNodeView();
  const attrs = context.node?.attrs as MentionAttrs;

  const { projectTask, loading } = useProjectTaskQuery(attrs.mentionId);

  if (loading) return <Loading />;
  if (!projectTask?.id) return null;

  return <TaskLink projectTaskId={projectTask.id} />;
});
