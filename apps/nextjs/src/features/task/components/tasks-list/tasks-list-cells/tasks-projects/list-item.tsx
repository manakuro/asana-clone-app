import { memo } from 'react';
import { useProjectTask } from '@/features/project/store/project-task';
import { ProjectChip } from '@/features/task/components/project-chip';

type Props = {
  projectTaskId: string;
};

export const ListItem = memo(function ListItem(props: Props) {
  const { projectTask } = useProjectTask(props.projectTaskId);

  return <ProjectChip variant="button" projectId={projectTask.projectId} />;
});
