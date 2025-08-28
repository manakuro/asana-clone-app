import { MenuItem } from '@/components/ui/organisms/Menu';
import { useFavoriteWorkspaceIdsCommand } from '@/store/entities/favoriteWorkspaceIds';
import { useCallback } from 'react';

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
