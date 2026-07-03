import { memo } from 'react';
import { FavoriteIconButton } from '@/components/ui/favorite-icon-button';
import { useClickableHoverStyle } from '@/hooks/styles/use-clickable-hover-style';
import {
  useFavoriteProjectIds,
  useFavoriteProjectIdsCommand,
} from '@/store/entities/favorite-project-ids';

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
      {...clickableHoverLightStyle}
    />
  );
});
