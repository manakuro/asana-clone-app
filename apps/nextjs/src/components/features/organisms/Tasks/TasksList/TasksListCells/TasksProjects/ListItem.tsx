import { ProjectChip } from '@/components/features/molecules/Chips';
import { useProjectTask } from '@/store/entities/projectTask';
import { memo } from 'react';

type Props = {
  projectTaskId: string;
};

export const ListItem = memo(function ListItem(props: Props) {
  const { projectTask } = useProjectTask(props.projectTaskId);

  return <ProjectChip variant="button" projectId={projectTask.projectId} />;
});
