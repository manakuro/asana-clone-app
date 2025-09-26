import { ProjectsContainer } from '@/components/pages/home/components/ProjectsContainer';
import { useFavoriteProjectIds } from '@/store/entities/favoriteProjectIds';
import { memo } from 'react';

export const FavoriteProjects = memo(function FavoriteProjects() {
  const { favoriteProjectIds } = useFavoriteProjectIds();

  if (!favoriteProjectIds.length) return null;

  return (
    <ProjectsContainer
      title="Favorite Projects"
      showNewOrder={false}
      projectIds={favoriteProjectIds}
      projectTileItemProps={{
        'aria-label': 'favorite project tile item',
      }}
      projectListItemProps={{
        'aria-label': 'favorite project list item',
      }}
    />
  );
});
