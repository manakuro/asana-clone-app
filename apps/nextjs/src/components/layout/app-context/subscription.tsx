import type { PropsWithChildren, ReactElement } from 'react';
import { memo } from 'react';
import { useFavoriteProjectIdsUpdatedSubscription } from '@/features/me/store/favorite-project-ids';
import { useMe } from '@/features/me/store/me';
import { useProjectUpdatedSubscription } from '@/features/project/store/project';
import {
  useProjectTaskCreatedByTaskIdSubscription,
  useProjectTaskCreatedSubscription,
  useProjectTaskDeletedSubscription,
  useProjectTaskUpdatedSubscription,
} from '@/features/project/store/project-task';
import {
  useProjectTaskSectionCreatedSubscription,
  useProjectTaskSectionDeletedAndDeleteTasksSubscription,
  useProjectTaskSectionDeletedAndKeepTasksSubscription,
  useProjectTaskSectionDeletedSubscription,
  useProjectTaskSectionUndeletedAndDeleteTasksSubscription,
  useProjectTaskSectionUndeletedAndKeepTasksSubscription,
  useProjectTaskSectionUpdatedSubscription,
} from '@/features/project/store/project-task-section';
import {
  useTaskAssignedSubscription,
  useTaskDeletedSubscription,
  useTaskUnassignedSubscription,
  useTaskUndeletedSubscription,
  useTaskUpdatedSubscription,
} from '@/features/task/store/task';
import {
  useTaskCollaboratorCreatedSubscription,
  useTaskCollaboratorDeletedSubscription,
} from '@/features/task/store/task-collaborator';
import {
  useTaskFeedCreatedSubscription,
  useTaskFeedDeletedSubscription,
  useTaskFeedUpdatedSubscription,
} from '@/features/task/store/task-feed';
import {
  useTaskFeedLikeCreatedSubscription,
  useTaskFeedLikeDeletedSubscription,
} from '@/features/task/store/task-feed-like';
import {
  useTaskLikeCreatedSubscription,
  useTaskLikeDeletedSubscription,
} from '@/features/task/store/task-like';
import {
  useTaskTagCreatedSubscription,
  useTaskTagDeletedSubscription,
} from '@/features/task/store/task-tag';
import {
  useTeammateTaskCreatedSubscription,
  useTeammateTaskUpdatedSubscription,
} from '@/features/teammate/store/teammate-task';
import {
  useTeammateTaskSectionCreatedSubscription,
  useTeammateTaskSectionDeletedAndDeleteTasksSubscription,
  useTeammateTaskSectionDeletedAndKeepTasksSubscription,
  useTeammateTaskSectionDeletedSubscription,
  useTeammateTaskSectionUndeletedAndDeleteTasksSubscription,
  useTeammateTaskSectionUndeletedAndKeepTasksSubscription,
  useTeammateTaskSectionUpdatedSubscription,
} from '@/features/teammate/store/teammates-task-section';
import {
  useWorkspace,
  useWorkspaceUpdatedSubscription,
} from '@/features/workspace/store/workspace';

export const Subscription = memo(function Subscription(
  props: PropsWithChildren,
) {
  const { workspace } = useWorkspace();
  const { me } = useMe();

  useFavoriteProjectIdsUpdatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  });
  useWorkspaceUpdatedSubscription({
    workspaceId: workspace.id,
  });

  useProjectTaskCreatedSubscription({
    workspaceId: workspace.id,
  });
  useProjectTaskUpdatedSubscription({
    workspaceId: workspace.id,
  });
  useProjectTaskCreatedByTaskIdSubscription({
    workspaceId: workspace.id,
  });
  useProjectTaskDeletedSubscription({
    workspaceId: workspace.id,
  });

  useProjectTaskSectionCreatedSubscription({
    workspaceId: workspace.id,
  });
  useProjectTaskSectionUpdatedSubscription({
    workspaceId: workspace.id,
  });
  useProjectTaskSectionDeletedSubscription({
    workspaceId: workspace.id,
  });
  useProjectTaskSectionDeletedAndKeepTasksSubscription({
    workspaceId: workspace.id,
  });
  useProjectTaskSectionDeletedAndDeleteTasksSubscription({
    workspaceId: workspace.id,
  });
  useProjectTaskSectionUndeletedAndKeepTasksSubscription({
    workspaceId: workspace.id,
  });
  useProjectTaskSectionUndeletedAndDeleteTasksSubscription({
    workspaceId: workspace.id,
  });

  useProjectUpdatedSubscription({
    workspaceId: workspace.id,
  });

  useTaskDeletedSubscription({
    workspaceId: workspace.id,
  });
  useTaskUndeletedSubscription({
    workspaceId: workspace.id,
  });
  useTaskAssignedSubscription({
    workspaceId: workspace.id,
  });
  useTaskUnassignedSubscription({
    workspaceId: workspace.id,
  });

  useTaskFeedUpdatedSubscription({
    workspaceId: workspace.id,
  });

  useTaskFeedCreatedSubscription({
    workspaceId: workspace.id,
  });

  useTaskFeedDeletedSubscription({
    workspaceId: workspace.id,
  });

  useTaskFeedLikeCreatedSubscription({
    workspaceId: workspace.id,
  });
  useTaskFeedLikeDeletedSubscription({
    workspaceId: workspace.id,
  });

  useTaskLikeCreatedSubscription({
    workspaceId: workspace.id,
  });
  useTaskLikeDeletedSubscription({
    workspaceId: workspace.id,
  });

  useTeammateTaskSectionUpdatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  });
  useTeammateTaskSectionCreatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  });
  useTeammateTaskSectionDeletedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  });
  useTeammateTaskSectionDeletedAndKeepTasksSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  });
  useTeammateTaskSectionDeletedAndDeleteTasksSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  });
  useTeammateTaskSectionUndeletedAndKeepTasksSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  });
  useTeammateTaskSectionUndeletedAndDeleteTasksSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  });

  useTeammateTaskCreatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  });
  useTeammateTaskUpdatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  });

  useTaskUpdatedSubscription({
    workspaceId: workspace.id,
  });

  useTaskTagCreatedSubscription({
    workspaceId: workspace.id,
  });
  useTaskTagDeletedSubscription({
    workspaceId: workspace.id,
  });

  useTaskCollaboratorCreatedSubscription({
    workspaceId: workspace.id,
  });
  useTaskCollaboratorDeletedSubscription({
    workspaceId: workspace.id,
  });

  return props.children as ReactElement;
});
