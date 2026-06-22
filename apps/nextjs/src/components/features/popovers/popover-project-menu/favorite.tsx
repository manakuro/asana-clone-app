import type React from 'react';
import { useCallback, useMemo } from 'react';
import { Menu } from '@/components/ui/menu';
import {
  useFavoriteProjectIds,
  useFavoriteProjectIdsCommand,
} from '@/store/entities/favoriteProjectIds';

type Props = {
  projectId: string;
};

export function Favorite(props: Props) {
  const { projectId } = props;
  const { setFavoriteProjectId } = useFavoriteProjectIdsCommand();
  const { isFavorite } = useFavoriteProjectIds();

  const text = useMemo(
    () =>
      isFavorite(projectId) ? 'Remove from favorites' : 'Add to Favorites',
    [isFavorite, projectId],
  );

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();

      await setFavoriteProjectId(projectId);
    },
    [projectId, setFavoriteProjectId],
  );

  return (
    <Menu.Item value={text} onClick={handleClick}>
      {text}
    </Menu.Item>
  );
}
