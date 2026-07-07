import { memo } from 'react';
import { useProjectIds } from '@/features/project/store/project';
import { ListItem } from './list-item';

export const ProjectList = memo(function ProjectList() {
  const { projectIds } = useProjectIds();

  return (
    <>
      {projectIds.map((id) => (
        <ListItem projectId={id} key={id} />
      ))}
    </>
  );
});
