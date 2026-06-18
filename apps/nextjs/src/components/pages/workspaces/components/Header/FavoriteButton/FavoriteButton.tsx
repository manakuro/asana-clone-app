import { memo } from 'react';
import { FavoriteIconButton } from '@/components/ui/favorite-icon-button';
import type { IconButtonProps } from '@/components/ui/icon-button';
import { Tooltip } from '@/components/ui/tooltip';
import {
  useFavoriteWorkspaceIds,
  useFavoriteWorkspaceIdsCommand,
} from '@/store/entities/favoriteWorkspaceIds';
import { useWorkspace } from '@/store/entities/workspace';

type Props = Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>;

export const FavoriteButton = memo(function FavoriteButton(props: Props) {
  const { workspace } = useWorkspace();
  const { isFavorite } = useFavoriteWorkspaceIds();
  const { setFavoriteWorkspaceId } = useFavoriteWorkspaceIdsCommand();

  return (
    <Tooltip
      showArrow
      content="Starring adds favorites to your sidebar for easy access."
      aria-label="Favorite project"
      size="md"
      withIcon
      openDelay={500}
    >
      <FavoriteIconButton
        favoriteId={workspace.id}
        isFavorite={isFavorite}
        setFavorite={setFavoriteWorkspaceId}
        h={6}
        w={6}
        iconStyle={{
          none: { color: 'fg.muted' },
        }}
        {...props}
      />
    </Tooltip>
  );
});
