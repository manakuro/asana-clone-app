import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { useFavoriteProjectIdsUpdatedSubscription as useSubscription } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { FavoriteProjectIdsUpdatedSubscriptionResponse as Response } from '../type';
import { useFavoriteProjectIdsResponse } from './useFavoriteProjectIdsResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  teammateId: string;
  workspaceId: string;
};

export const FAVORITE_PROJECT_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useFavoriteProjectIdsUpdatedSubscription = (props: Props) => {
  const { setFavoriteProjectIds } = useFavoriteProjectIdsResponse();

  const skipSubscription = useMemo(() => !props.teammateId, [props.teammateId]);

  const setBySubscription = useCallback(
    (response: Response) => {
      const favoriteProjectIdsUpdated = response.favoriteProjectIdsUpdated;

      if (isDev()) console.log('Favorite Project IDs Updated!: ');

      setFavoriteProjectIds(favoriteProjectIdsUpdated);
    },
    [setFavoriteProjectIds],
  );

  useSubscription({
    variables: {
      teammateId: props.teammateId,
      requestId: FAVORITE_PROJECT_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
    skip: skipSubscription,
  });
};
