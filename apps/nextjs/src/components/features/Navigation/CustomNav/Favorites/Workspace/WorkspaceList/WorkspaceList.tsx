import { useFavoriteWorkspaceIds } from '@/store/entities/favoriteWorkspaceIds';
import { memo } from 'react';
import { ListItem } from './ListItem';

export const WorkspaceList = memo(function WorkspaceList() {
  const { favoriteWorkspaceIds } = useFavoriteWorkspaceIds();

  return <>{favoriteWorkspaceIds.length > 0 && <ListItem />}</>;
});
