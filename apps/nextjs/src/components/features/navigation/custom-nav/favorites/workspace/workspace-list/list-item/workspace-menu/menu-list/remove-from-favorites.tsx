import { useCallback } from 'react';
import { Menu } from '@/components/ui/menu';
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

  return (
    <Menu.Item value="0" onClick={handleClick}>
      Remove from Favorites
    </Menu.Item>
  );
}
