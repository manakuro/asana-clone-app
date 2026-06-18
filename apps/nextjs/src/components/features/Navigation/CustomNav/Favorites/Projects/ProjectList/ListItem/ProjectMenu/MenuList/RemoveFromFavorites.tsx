import { useCallback } from 'react';
import { Menu } from '@/components/ui/menu';
import { useFavoriteProjectIdsCommand } from '@/store/entities/favoriteProjectIds';

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

  return (
    <Menu.Item value="0" onClick={handleClick}>
      Remove from Favorites
    </Menu.Item>
  );
}
