import { memo } from 'react';
import { ProjectChip } from '@/features/task/components/project-chip';
import { useProjectTask } from '@/store/entities/project-task';

type Props = {
  projectTaskId: string;
};

export const ListItem = memo(function ListItem(props: Props) {
  const { projectTask } = useProjectTask(props.projectTaskId);

  return <ProjectChip variant="button" projectId={projectTask.projectId} />;
});
