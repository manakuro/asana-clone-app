import type React from 'react';
import { useCallback, useMemo } from 'react';
import { Menu } from '@/components/ui/Menu';
import {
  useFavoriteProjectIds,
  useFavoriteProjectIdsCommand,
} from '@/store/entities/favoriteProjectIds';

type Props = {
  projectId: string;
  onClose: () => void;
  onMouseEnter: () => void;
};

export function Favorite(props: Props) {
  const { projectId, onClose, onMouseEnter } = props;
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
      onClose();

      await setFavoriteProjectId(projectId);
    },
    [onClose, projectId, setFavoriteProjectId],
  );

  return (
    <Menu.Item value={text} onMouseEnter={onMouseEnter} onClick={handleClick}>
      {text}
    </Menu.Item>
  );
}
