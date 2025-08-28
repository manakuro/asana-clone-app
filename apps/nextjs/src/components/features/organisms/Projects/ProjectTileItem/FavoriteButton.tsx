import { FavoriteIconButton } from '@/components/ui/molecules';
import { useClickableHoverStyle } from '@/hooks';
import {
  useFavoriteProjectIds,
  useFavoriteProjectIdsCommand,
} from '@/store/entities/favoriteProjectIds';
import { memo } from 'react';

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
      variant="unstyled"
      pl={2}
      {...clickableHoverLightStyle}
    />
  );
});
