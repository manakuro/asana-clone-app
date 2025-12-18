import isEqual from 'lodash-es/isEqual';
import { useCallback } from 'react';
import { useFavoriteWorkspaceIdsUpdatedSubscription as useSubscription } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { FavoriteWorkspaceIdsUpdatedSubscriptionResponse as Response } from '../type';
import { useFavoriteWorkspaceIdsResponse } from './useFavoriteWorkspaceIdsResponse';

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

  useSubscription({
    variables: {
      teammateId: props.teammateId,
      requestId: FAVORITE_WORKSPACE_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
    },
    onSubscriptionData: (data) => {
      if (
        isEqual(
          data.subscriptionData.data,
          previousData?.subscriptionData?.data,
        )
      )
        return;

      if (data.subscriptionData.data)
        setBySubscription(data.subscriptionData.data);
      previousData = data;
    },
    skip: !props.teammateId,
  });
};
