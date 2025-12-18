import { useCallback } from 'react';
import { MenuItem } from '@/components/ui/Menu';
import { useFavoriteWorkspaceIdsCommand } from '@/store/entities/favoriteWorkspaceIds';

type Props = {
  workspaceId: string;
  onClose: () => void;
};

export function RemoveFromFavorites(props: Props) {
  const { onClose, workspaceId } = props;
  const { setFavoriteWorkspaceId } = useFavoriteWorkspaceIdsCommand();

  const handleClick = useCallback(() => {
    onClose();
    setFavoriteWorkspaceId(workspaceId);
  }, [onClose, workspaceId, setFavoriteWorkspaceId]);

  return <MenuItem onClick={handleClick}>Remove from Favorites</MenuItem>;
}
