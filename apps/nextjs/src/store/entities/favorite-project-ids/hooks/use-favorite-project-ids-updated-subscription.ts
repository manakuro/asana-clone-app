import { useSubscription } from '@apollo/client/react';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { FavoriteProjectIdsUpdatedDocument } from '@/graphql/documents';
import { isDev } from '@/utils/environment';
import { uuid } from '@/utils/uuid';
import type { FavoriteProjectIdsUpdatedSubscriptionResponse as Response } from '../type';
import { useFavoriteProjectIdsResponse } from './use-favorite-project-ids-response';

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

  useSubscription(FavoriteProjectIdsUpdatedDocument, {
    variables: {
      teammateId: props.teammateId,
      requestId: FAVORITE_PROJECT_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setBySubscription(data.data);
      previousData = data;
    },
    skip: skipSubscription,
  });
};
