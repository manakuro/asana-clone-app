import { memo } from 'react';
import { ProjectsContainer } from '@/components/pages/home/index/components/projects-container';
import { useProjectIds } from '@/features/project/store/project';

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
