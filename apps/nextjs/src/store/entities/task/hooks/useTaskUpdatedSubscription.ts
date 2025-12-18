import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback } from 'react';
import { useTaskUpdatedSubscription as useSubscription } from '@/graphql/hooks';
import { isDescriptionEqual } from '@/shared/editor/isDescriptionEqual';
import { uuid } from '@/shared/uuid';
import {
  type TaskUpdatedSubscriptionResponse,
  taskState,
} from '@/store/entities/task';
import { useSetHasDescriptionUpdated } from './useHasDescriptionUpdated';
import { useUpsert } from './useUpsert';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};

export const TASK_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskUpdatedSubscription = (props: Props) => {
  const { upsert } = useUpsert();
  const { setHasDescriptionUpdated } = useSetHasDescriptionUpdated();

  const setBySubscription = useAtomCallback(
    useCallback(
      async (get, _set, response: TaskUpdatedSubscriptionResponse) => {
        const updatedTask = response.taskUpdated;
        const prev = get(taskState(updatedTask.id));

        console.log('task updated!');

        upsert({
          ...prev,
          ...updatedTask,
          // To prevent autofocus on input.
          isNew: false,
        });

        if (!isDescriptionEqual(prev.description, updatedTask.description)) {
          await setHasDescriptionUpdated(updatedTask.id);
        }
      },
      [upsert, setHasDescriptionUpdated],
    ),
  );

  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
  });
};
