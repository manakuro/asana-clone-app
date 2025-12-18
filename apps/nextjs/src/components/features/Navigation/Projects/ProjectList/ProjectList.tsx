import { memo } from 'react';
import { useProjectIds } from '@/store/entities/project';
import { ListItem } from './ListItem';

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
