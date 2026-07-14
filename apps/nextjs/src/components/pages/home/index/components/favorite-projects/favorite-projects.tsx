import { memo } from 'react';
import { ProjectsContainer } from '@/components/pages/home/index/components/projects-container';
import { useFavoriteProjectIds } from '@/features/me/store/favorite-project-ids';

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
