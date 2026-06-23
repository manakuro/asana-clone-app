import { memo } from 'react';
import { useFavoriteProjectIds } from '@/store/entities/favoriteProjectIds';
import { ListItem } from './list-item';

export const ProjectList = memo(function ProjectList() {
  const { favoriteProjectIds } = useFavoriteProjectIds();

  return (
    <>
      {favoriteProjectIds.map((id) => (
        <ListItem projectId={id} key={id} />
      ))}
    </>
  );
});
