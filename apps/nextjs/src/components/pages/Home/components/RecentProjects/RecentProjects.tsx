import { ProjectsContainer } from '@/components/pages/Home/components/ProjectsContainer';
import { useProjectIds } from '@/store/entities/project';
import { memo } from 'react';

export const RecentProjects = memo(function RecentProjects() {
  const { projectIds } = useProjectIds();

  return (
    <ProjectsContainer
      title="Recent Projects"
      showNewOrder
      projectIds={projectIds}
      projectTileItemProps={{
        'aria-label': 'recent project tile item',
      }}
      projectListItemProps={{
        'aria-label': 'recent project list item',
      }}
    />
  );
});
