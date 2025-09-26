import { useFavoriteProjectIds } from '@/store/entities/favoriteProjectIds';
import { memo } from 'react';
import { ListItem } from './ListItem';

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
