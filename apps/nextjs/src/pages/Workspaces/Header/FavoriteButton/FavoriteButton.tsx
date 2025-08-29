import type { IconButtonProps } from '@/components/ui/atoms';
import { FavoriteIconButton, Tooltip } from '@/components/ui/molecules';
import {
  useFavoriteWorkspaceIds,
  useFavoriteWorkspaceIdsCommand,
} from '@/store/entities/favoriteWorkspaceIds';
import { useWorkspace } from '@/store/entities/workspace';
import { memo } from 'react';

type Props = Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>;

export const FavoriteButton = memo(function FavoriteButton(props: Props) {
  const { workspace } = useWorkspace();
  const { isFavorite } = useFavoriteWorkspaceIds();
  const { setFavoriteWorkspaceId } = useFavoriteWorkspaceIdsCommand();

  return (
    <Tooltip
      hasArrow
      label="Starring adds favorites to your sidebar for easy access."
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
          none: { color: 'text.muted' },
        }}
        {...props}
      />
    </Tooltip>
  );
});
