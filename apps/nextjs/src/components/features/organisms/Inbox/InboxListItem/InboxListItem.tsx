import { useInboxListItem } from '@/components/features/organisms/Inbox';
import type { FlexProps } from '@/components/ui/atoms';
import { ActivityTypeCode } from '@/store/entities/activityType';
import { memo } from 'react';
import { Provider } from './Provider';
import { TaskActivity } from './TaskActivity';
import { WorkspaceActivity } from './WorkspaceActivity';

type Props = FlexProps & {
  listItemId: string;
};

export const InboxListItem = memo(function InboxListItem(props: Props) {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  );
});

const Component = memo(function Component(props: Props) {
  const { listItemId } = props;
  const { listItem } = useInboxListItem(listItemId);

  switch (listItem.type) {
    case ActivityTypeCode.Workspace:
      return <WorkspaceActivity workspaceActivityId={listItem.id} />;
    case ActivityTypeCode.Task:
      return <TaskActivity taskActivityId={listItem.id} />;
    default:
      return null;
  }
});
