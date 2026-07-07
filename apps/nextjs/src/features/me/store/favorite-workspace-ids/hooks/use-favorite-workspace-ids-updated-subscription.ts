import { useSubscription } from '@apollo/client/react';
import isEqual from 'lodash-es/isEqual';
import { useCallback } from 'react';
import { FavoriteWorkspaceIdsUpdatedDocument } from '@/graphql/documents';
import { isDev } from '@/utils/environment';
import { uuid } from '@/utils/uuid';
import type { FavoriteWorkspaceIdsUpdatedSubscriptionResponse as Response } from '../type';
import { useFavoriteWorkspaceIdsResponse } from './use-favorite-workspace-ids-response';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

export const FAVORITE_WORKSPACE_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();

type Props = {
  teammateId: string;
};
export const useFavoriteWorkspaceIdsUpdatedSubscription = (props: Props) => {
  const { setFavoriteWorkspaceIds } = useFavoriteWorkspaceIdsResponse();

  const setBySubscription = useCallback(
    (response: Response) => {
      const favoriteWorkspaceIdsUpdated = response.favoriteWorkspaceIdsUpdated;

      if (isDev()) console.log('Favorite Workspace IDs Created!: ');

      setFavoriteWorkspaceIds(favoriteWorkspaceIdsUpdated);
    },
    [setFavoriteWorkspaceIds],
  );

  useSubscription(FavoriteWorkspaceIdsUpdatedDocument, {
    variables: {
      teammateId: props.teammateId,
      requestId: FAVORITE_WORKSPACE_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setBySubscription(data.data);
      previousData = data;
    },
    skip: !props.teammateId,
  });
};
