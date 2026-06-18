import { memo } from 'react';
import {
  PopoverEditorLink,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
  PopoverEditorLinkTrigger,
} from '@/components/features/Popovers';
import { CheckIcon } from '@/components/ui/check-icon';
import { useProjectTask } from '@/store/entities/projectTask';
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
