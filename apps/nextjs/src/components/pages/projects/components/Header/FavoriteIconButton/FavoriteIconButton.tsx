import { memo } from 'react';
import { FavoriteIconButton as MoleculesFavoriteIconButton } from '@/components/ui/favorite-icon-button';
import type { IconButtonProps } from '@/components/ui/icon-button';
import { Tooltip } from '@/components/ui/tooltip';
import {
  useFavoriteProjectIds,
  useFavoriteProjectIdsCommand,
} from '@/store/entities/favoriteProjectIds';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';

type Props = {
  projectId: string;
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>;

export const FavoriteIconButton = memo(function FavoriteIconButton(
  props: Props,
) {
  const { projectId } = props;
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);
  const { setFavoriteProjectId } = useFavoriteProjectIdsCommand();
  const { isFavorite } = useFavoriteProjectIds();

  return (
    <Tooltip
      showArrow
      content="Starring adds favorites to your sidebar for easy access."
      aria-label="Favorite project"
      size="md"
      withIcon
      openDelay={500}
    >
      <MoleculesFavoriteIconButton
        favoriteId={projectId}
        isFavorite={isFavorite}
        setFavorite={setFavoriteProjectId}
        h={6}
        w={6}
        iconStyle={{
          favorite: { color: projectBaseColor.color.color },
          none: { color: 'fg.muted' },
        }}
      />
    </Tooltip>
  );
});
