import { memo } from 'react';
import { useFavoriteWorkspaceIds } from '@/store/entities/favorite-workspace-ids';
import { ListItem } from './list-item';

export const WorkspaceList = memo(function WorkspaceList() {
  const { favoriteWorkspaceIds } = useFavoriteWorkspaceIds();

  return <>{favoriteWorkspaceIds.length > 0 && <ListItem />}</>;
});
