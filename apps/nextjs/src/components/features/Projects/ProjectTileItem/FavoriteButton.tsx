import { memo } from 'react';
import { FavoriteIconButton } from '@/components/ui/favorite-icon-button';
import { useClickableHoverStyle } from '@/hooks';
import {
  useFavoriteProjectIds,
  useFavoriteProjectIdsCommand,
} from '@/store/entities/favoriteProjectIds';

type Props = {
  projectId: string;
};

export const FavoriteButton = memo(function FavoriteButton(props: Props) {
  const { projectId } = props;
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const { setFavoriteProjectId } = useFavoriteProjectIdsCommand();
  const { isFavorite } = useFavoriteProjectIds();

  return (
    <FavoriteIconButton
      favoriteId={projectId}
      isFavorite={isFavorite}
      setFavorite={setFavoriteProjectId}
      unstyled
      pl={2}
      {...clickableHoverLightStyle}
    />
  );
});
