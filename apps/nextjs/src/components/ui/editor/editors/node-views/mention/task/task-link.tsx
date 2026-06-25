import { memo } from 'react';
import { PopoverEditorLink } from '@/components/features/popovers/popover-editor-link/popover-editor-link';
import { PopoverEditorLinkContent } from '@/components/features/popovers/popover-editor-link/popover-editor-link-content';
import { PopoverEditorLinkText } from '@/components/features/popovers/popover-editor-link/popover-editor-link-text';
import { PopoverEditorLinkTrigger } from '@/components/features/popovers/popover-editor-link/popover-editor-link-trigger';
import { CheckIcon } from '@/components/ui/check-icon';
import { useProjectTask } from '@/store/entities/project-task';
import { useTask } from '@/store/entities/task';

type Props = {
  projectTaskId: string;
};

export const TaskLink = memo(function TaskLink(props: Props) {
  const { projectTask } = useProjectTask(props.projectTaskId);
  const { task } = useTask(projectTask.taskId);

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>{`${task.name} `}</PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <CheckIcon completed={task.completed} size="sm" cursor="auto" />
        <PopoverEditorLinkText>{task.name}</PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  );
});
