import { MenuItem } from '@/components/ui/organisms/Menu';
import { useFavoriteProjectIdsCommand } from '@/store/entities/favoriteProjectIds';
import { useCallback } from 'react';

type Props = {
  projectId: string;
  onClose: () => void;
};

export function RemoveFromFavorites(props: Props) {
  const { onClose, projectId } = props;
  const { setFavoriteProjectId } = useFavoriteProjectIdsCommand();

  const handleClick = useCallback(() => {
    onClose();
    setFavoriteProjectId(projectId);
  }, [onClose, projectId, setFavoriteProjectId]);

  return <MenuItem onClick={handleClick}>Remove from Favorites</MenuItem>;
}
