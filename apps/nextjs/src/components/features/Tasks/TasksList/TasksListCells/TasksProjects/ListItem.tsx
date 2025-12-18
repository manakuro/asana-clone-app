import { memo } from 'react';
import { ProjectChip } from '@/components/features/Chips';
import { useProjectTask } from '@/store/entities/projectTask';

type Props = {
  projectTaskId: string;
};

export const ListItem = memo(function ListItem(props: Props) {
  const { projectTask } = useProjectTask(props.projectTaskId);

  return <ProjectChip variant="button" projectId={projectTask.projectId} />;
});
